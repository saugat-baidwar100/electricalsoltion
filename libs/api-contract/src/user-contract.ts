import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const ErrorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  fullname: z.string(),
  username: z.string(),
  role: z.enum(['user', 'manager', 'admin']),
});

export const UserCreateSchema = z.object({
  email: z.string().email(),
  fullname: z.string(),
  username: z.string(),
  password: z.string().min(6),
  role: z.enum(['USER', 'MANAGER', 'ADMIN']).default('USER'),
});

export const UserUpdateSchema = z.object({
  fullname: z.string().optional(),
  username: z.string().optional(),
  role: z.enum(['USER', 'MANAGER', 'ADMIN']).optional(),
});

export const userContract = c.router({
  getUsers: {
    method: 'GET',
    path: '/users',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(UserSchema),
      }),
      500: ErrorSchema,
    },
  },

  getUser: {
    method: 'GET',
    path: '/users/:id',
    responses: {
      200: SuccessSchema.extend({
        data: UserSchema,
      }),
      404: ErrorSchema,
    },
  },

  createUser: {
    method: 'POST',
    path: '/users',
    body: UserCreateSchema,
    responses: {
      201: SuccessSchema.extend({
        data: UserSchema,
      }),
      400: ErrorSchema,
    },
  },

  updateUser: {
    method: 'PUT',
    path: '/users/:id',
    body: UserUpdateSchema,
    responses: {
      200: SuccessSchema.extend({
        data: UserSchema,
      }),
      404: ErrorSchema,
    },
  },

  deleteUser: {
    method: 'DELETE',
    path: '/users/:id',
    responses: {
      200: SuccessSchema,
      404: ErrorSchema,
    },
  },
});
