import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const OrderSchema = z.object({
  id: z.string(),
  userId: z.string(),
  type: z.enum(['PRODUCT', 'SERVICE']),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  productId: z.string().nullable(),
  serviceId: z.string().nullable(),
  address: z.string(),
  phone: z.string(),
  notes: z.string().nullable(),
  createdAt: z.string(),
});

const ErrorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const OrderCreateSchema = OrderSchema.omit({
  id: true,
  status: true,
  createdAt: true,
});

export const orderContract = c.router({
  getOrders: {
    method: 'GET',
    path: '/orders',
    responses: {
      200: SuccessSchema.extend({ data: z.array(OrderSchema) }),
      500: ErrorSchema,
    },
    summary: 'Get all orders',
  },
  getOrder: {
    method: 'GET',
    path: '/orders/:id',
    responses: {
      200: SuccessSchema.extend({ data: OrderSchema }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Get order by ID',
  },
  createOrder: {
    method: 'POST',
    path: '/orders',
    body: OrderCreateSchema,
    responses: {
      201: SuccessSchema.extend({ data: OrderSchema }),
      400: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Create order',
  },
  updateOrderStatus: {
    method: 'PUT',
    path: '/orders/:id',
    body: z.object({ status: z.enum(['PENDING', 'APPROVED', 'REJECTED']) }),
    responses: {
      200: SuccessSchema.extend({ data: OrderSchema }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Update order status',
  },
  deleteOrder: {
    method: 'POST',
    path: '/orders/:id',
    body: z.object({}),
    responses: {
      200: SuccessSchema.extend({ data: OrderSchema }),
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Delete order',
  },
});
