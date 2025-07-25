import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const authContract = c.router({
  // Signup - Sends OTP & saves temp user (Unverified)
  signup: {
    method: 'POST',
    path: '/signup',
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
      role: z.enum(['USER', 'ADMIN']),
    }),
    responses: {
      201: z.object({ message: z.string() }),
      400: z.object({ error: z.string() }),
    },
  },

  // Verify OTP (Creates user after verifying OTP)
  verifyOtp: {
    method: 'POST',
    path: '/verify-otp',
    body: z.object({
      email: z.string().email(),
      otp: z.string().length(6),
    }),
    responses: {
      200: z.object({ message: z.string(), token: z.string() }),
      400: z.object({ error: z.string() }),
    },
  },

  // Resend OTP
  resendOtp: {
    method: 'POST',
    path: '/resend-otp',
    body: z.object({
      email: z.string().email(),
    }),
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ error: z.string() }),
    },
  },

  // Forgot Password (Send OTP)
  forgetPassword: {
    method: 'POST',
    path: '/forget-password',
    body: z.object({
      email: z.string().email(),
    }),
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ error: z.string() }),
    },
  },

  // Reset Password (Verify OTP + Reset Password)
  resetPassword: {
    method: 'POST',
    path: '/reset-password',
    body: z.object({
      email: z.string().email(),
      otp: z.string().length(6),
      newPassword: z.string().min(6),
    }),
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ error: z.string() }),
    },
  },

  // Login (Returns JWT Token in Cookie)
  login: {
    method: 'POST',
    path: '/login',
    body: z.object({
      email: z.string().email(),
      password: z.string().min(6),
    }),
    responses: {
      200: z.object({ message: z.string() }),
      400: z.object({ error: z.string() }),
    },
  },

  // Logout (Clears Cookie)
  logout: {
    method: 'POST',
    path: '/logout',
    body: z.object({}),
    responses: {
      200: z.object({ message: z.string() }),
      // 400: z.object({ error: z.string() }),
    },
  },

  // Get Current User (Me Route)
  me: {
    method: 'GET',
    path: '/me',
    responses: {
      200: z.object({
        id: z.string(),
        email: z.string().email(),
        role: z.enum(['USER', 'ADMIN']),
      }),
      401: z.object({ error: z.string() }),
    },
  },
});
