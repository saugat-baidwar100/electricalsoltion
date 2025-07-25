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

export const SubCategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  categoryId: z.string(), // Foreign key to Category
});

export const SubCategoryCreateSchema = SubCategorySchema.omit({ id: true });

export type SubCategory = z.infer<typeof SubCategorySchema>;

export const subCategoryContract = c.router({
  getSubCategories: {
    method: 'GET',
    path: '/sub-categories',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(SubCategorySchema),
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all subcategories',
  },
  getSubCategory: {
    method: 'GET',
    path: '/sub-categories/:id',
    responses: {
      200: SuccessSchema.extend({
        data: SubCategorySchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get subcategory by ID',
  },
  createSubCategory: {
    method: 'POST',
    path: '/sub-categories',
    body: SubCategoryCreateSchema,
    responses: {
      201: SuccessSchema.extend({
        data: SubCategorySchema,
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a new subcategory',
  },
  updateSubCategory: {
    method: 'PUT',
    path: '/sub-categories/:id',
    body: SubCategoryCreateSchema,
    responses: {
      200: SuccessSchema.extend({
        data: SubCategorySchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Update subcategory by ID',
  },
  deleteSubCategory: {
    method: 'POST',
    path: '/sub-categories/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: SubCategorySchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete subcategory by ID',
  },
});
