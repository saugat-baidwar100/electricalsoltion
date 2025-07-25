import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

interface UserPayload {
  id: string;
  email: string;
  role: 'user' | 'manager' | 'admin';
}

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
    return;  // ✅ Do not return res, just stop function here
  }

  try {
    const user = verifyToken(token) as UserPayload;
    req.user = user;
    next();  // ✅ Normal
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

export function roleGuard(roles: UserPayload['role'][]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
    next();
  };
}
