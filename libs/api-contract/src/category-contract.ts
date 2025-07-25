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

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  description: z.string().nullable(),
});

export const CategoryCreateSchema = CategorySchema.omit({ id: true });

export type Category = z.infer<typeof CategorySchema>;

export const categoryContract = c.router({
  getCategories: {
    method: 'GET',
    path: '/categories',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(CategorySchema),
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all categories',
  },
  getCategory: {
    method: 'GET',
    path: '/categories/:id',
    responses: {
      200: SuccessSchema.extend({
        data: CategorySchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get category by ID',
  },
  createCategory: {
    method: 'POST',
    path: '/categories',
    body: CategoryCreateSchema,
    responses: {
      201: SuccessSchema.extend({
        data: CategorySchema,
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a new category',
  },
  updateCategory: {
    method: 'PUT',
    path: '/categories/:id',
    body: CategoryCreateSchema,
    responses: {
      200: SuccessSchema.extend({
        data: CategorySchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Update category by ID',
  },
  deleteCategory: {
    method: 'POST',
    path: '/categories/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: CategorySchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete category by ID',
  },
});
