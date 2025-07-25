// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET || 'super_secret';
// if (!JWT_SECRET) {
//   throw new Error('Missing TOKEN_SECRET environment variable');
// }

// export function generateToken(payload: {
//   id: string;
//   email: string;
//   role: string;
// }) {
//   return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
// }

// export function verifyToken(token: string) {
//   return jwt.verify(token, JWT_SECRET);
// }


import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export const generateJwt = (payload: { userId: string }) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyJwt = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
};
