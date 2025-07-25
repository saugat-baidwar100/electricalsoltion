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

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  description: z.string().nullable(),
  categoryId: z.string(),
  subCategoryId: z.string(),
});

export const ProductCreateSchema = ProductSchema.omit({ id: true });

export type Product = z.infer<typeof ProductSchema>;

export const productContract = c.router({
  getProducts: {
    method: 'GET',
    path: '/products',
    responses: {
      200: SuccessSchema.extend({
        data: z.array(ProductSchema),
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get all products',
  },
  getProduct: {
    method: 'GET',
    path: '/products/:id',
    responses: {
      200: SuccessSchema.extend({
        data: ProductSchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get product by ID',
  },
  createProduct: {
    method: 'POST',
    path: '/products',
    body: ProductCreateSchema,
    responses: {
      201: SuccessSchema.extend({
        data: ProductSchema,
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create a product',
  },
  updateProduct: {
    method: 'PUT',
    path: '/products/:id',
    body: ProductCreateSchema,
    responses: {
      200: SuccessSchema.extend({
        data: ProductSchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Update product by ID',
  },
  deleteProduct: {
    method: 'POST',
    path: '/products/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({
        data: ProductSchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete product by ID',
  },
});
