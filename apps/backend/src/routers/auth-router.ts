import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { authContract } from '../../../../libs/api-contract/src/auth-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { authRepo } from '../../../../libs/electric-prisma/src/auth-repo';

import { sendOtpEmail } from '../utils/nodemailer';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const s = initServer();
const JWT_SECRET = process.env.TOKEN_SECRET;

if (!JWT_SECRET) {
  throw new Error('TOKEN_SECRET is missing! Please define it in your .env');
}

export const authRouter = s.router(authContract, {
  signup: async ({ body }) => {
    const existingEmail = await authRepo.findUserByEmail(body.email);
    if (existingEmail) {
      return {
        status: 400,
        body: { message: 'Email already registered', isSuccess: false },
      };
    }

    const existingUsername = await authRepo.findUserByUsername(body.username);
    if (existingUsername) {
      return {
        status: 400,
        body: { message: 'Username already taken', isSuccess: false },
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await authRepo.createUser(
      body.email,
      body.password,
      body.fullname,
      body.username,
      otp
    );

    await sendOtpEmail(body.email, otp);

    return {
      status: 200,
      body: { message: 'OTP sent to email', isSuccess: true },
    };
  },

  verifyOtp: async ({ body }) => {
    const user = await authRepo.verifyOtp(body.email, body.otp);
    if (!user) {
      return {
        status: 400,
        body: { message: 'Invalid or expired OTP', isSuccess: false },
      };
    }

    return {
      status: 200,
      body: { message: 'OTP verified successfully', isSuccess: true },
    };
  },

  resendOtp: async ({ body }) => {
    const user = await authRepo.findUserByEmail(body.email);
    if (!user) {
      return {
        status: 400,
        body: { message: 'User not found', isSuccess: false },
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await authRepo.updateOtp(body.email, otp);
    await sendOtpEmail(body.email, otp);

    return {
      status: 200,
      body: { message: 'OTP resent successfully', isSuccess: true },
    };
  },

  login: async ({ body, res }) => {
    const user = await authRepo.findUserByEmail(body.email);
    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return {
        status: 400,
        body: { message: 'Invalid credentials', isSuccess: false },
      };
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      status: 200,
      body: { message: 'Login successful', isSuccess: true },
    };
  },

  forgotPassword: async ({ body }) => {
    const user = await authRepo.findUserByEmail(body.email);
    if (!user) {
      return {
        status: 400,
        body: { message: 'User not found', isSuccess: false },
      };
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await authRepo.updateOtp(body.email, otp);
    await sendOtpEmail(body.email, otp);

    return {
      status: 200,
      body: { message: 'OTP sent for password reset', isSuccess: true },
    };
  },

  resetPassword: async ({ body }) => {
    const user = await authRepo.verifyOtp(body.email, body.otp);
    if (!user) {
      return {
        status: 400,
        body: { message: 'Invalid or expired OTP', isSuccess: false },
      };
    }

    await authRepo.resetPassword(body.email, body.newPassword);

    return {
      status: 200,
      body: { message: 'Password reset successful', isSuccess: true },
    };
  },

  logout: async ({ res }) => {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return {
      status: 200,
      body: { message: 'Logged out successfully', isSuccess: true },
    };
  },
});
