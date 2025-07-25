import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const ServiceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string(),
  basePrice: z.number(),
  priceRange: z.string(),
  timeDuration: z.string(),
  city: z.string(),
  latitude: z.number(),
  longitude: z.number(),
});

export const CreateServiceSchema = ServiceSchema.omit({ id: true });
export const UpdateServiceSchema = CreateServiceSchema;

export type Service = z.infer<typeof ServiceSchema>;

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});
const ErrorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const serviceContract = c.router({
  getAllServices: {
    method: 'GET',
    path: '/services',
    query: z.object({
      city: z.string(),
    }),
    responses: {
      200: SuccessSchema.extend({
        data: z.array(ServiceSchema),
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },
  getService: {
    method: 'GET',
    path: '/services/:id',
    responses: {
      200: SuccessSchema.extend({
        data: ServiceSchema,
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
  },
  createService: {
    method: 'POST',
    path: '/services',
    body: CreateServiceSchema,
    responses: {
      201: SuccessSchema.extend({
        data: ServiceSchema,
      }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
  },
  updateService: {
    method: 'PUT',
    path: '/services/:id',
    body: UpdateServiceSchema,
    responses: {
      200: SuccessSchema.extend({
        data: ServiceSchema,
      }),
      400: ErrorSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
  },
  deleteService: {
    method: 'DELETE',
    path: '/services/:id',
    responses: {
      200: SuccessSchema.extend({
        message: z.string(),
        isSuccess: z.boolean(),
      }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
  },
});
