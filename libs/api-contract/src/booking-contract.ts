import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const BookingSchema = z.object({
  id: z.string(),
  userId: z.string(),
  serviceId: z.string(),
  phone: z.string(),
  notes: z.string().nullable().optional(),
  city: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  createdAt: z.string(),
});

export type Booking = z.infer<typeof BookingSchema>;

const SuccessSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

const ErrorSchema = z.object({
  message: z.string(),
  isSuccess: z.boolean(),
});

export const CreateBookingSchema = BookingSchema.omit({ id: true, createdAt: true, status: true });

export const bookingContract = c.router({
  createBooking: {
    method: 'POST',
    path: '/bookings',
    body: CreateBookingSchema,
    responses: {
      201: SuccessSchema.extend({ data: BookingSchema }),
      500: ErrorSchema,
    },
    summary: 'Create booking',
  },
  getBookings: {
    method: 'GET',
    path: '/bookings',
    responses: {
      200: SuccessSchema.extend({ data: z.array(BookingSchema) }),
      500: ErrorSchema,
    },
    summary: 'Get all bookings',
  },
  updateBookingStatus: {
    method: 'PUT',
    path: '/bookings/:id/status',
    body: z.object({
      status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
    }),
    responses: {
      200: SuccessSchema,
      404: ErrorSchema,
      500: ErrorSchema,
    },
    summary: 'Update booking status',
  },
});
