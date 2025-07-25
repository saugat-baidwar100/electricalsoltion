import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { bookingContract } from '../../../../libs/api-contract/src/booking-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { bookingRepo } from '../../../../libs/electric-prisma/src/booking-repo';

const s = initServer();

export const bookingRouter = s.router(bookingContract, {
  createBooking: async ({ body }) => {
    try {
      const booking = await bookingRepo.create({
        user: { connect: { id: body.userId } },
        service: { connect: { id: body.serviceId } },
        phone: body.phone,
        notes: body.notes ?? null,
        city: body.city,
      });

      return {
        status: 201,
        body: {
          message: 'Booking created successfully',
          isSuccess: true,
          data: {
            id: booking.id,
            userId: booking.userId,
            serviceId: booking.serviceId,
            phone: booking.phone,
            notes: booking.notes,
            city: booking.city,
            status: booking.status,
            createdAt: booking.createdAt.toISOString(),
          },
        },
      };
    } catch (error) {
      return {
        status: 500,
        body: {
          message: 'Failed to create booking',
          isSuccess: false,
          errors: error,
        },
      };
    }
  },

  getBookings: async () => {
    try {
      const bookings = await bookingRepo.findAll();
      const formattedBookings = bookings.map((b) => ({
        id: b.id,
        userId: b.userId,
        serviceId: b.serviceId,
        phone: b.phone,
        notes: b.notes,
        city: b.city,
        status: b.status,
        createdAt: b.createdAt.toISOString(), // ✅ convert Date → string
      }));

      return {
        status: 200,
        body: {
          message: 'Fetched bookings successfully',
          isSuccess: true,
          data: formattedBookings,
        },
      };
    } catch (error) {
      return {
        status: 500,
        body: {
          message: 'Failed to fetch bookings',
          isSuccess: false,
          errors: error,
        },
      };
    }
  },

  updateBookingStatus: async ({ params, body }) => {
    try {
      const booking = await bookingRepo.findById(params.id);

      if (!booking) {
        return {
          status: 404,
          body: {
            message: 'Booking not found',
            isSuccess: false,
          },
        };
      }

      await bookingRepo.updateStatus(params.id, body.status);

      return {
        status: 200,
        body: {
          message: `Booking status updated to ${body.status}`,
          isSuccess: true,
        },
      };
    } catch (error) {
      return {
        status: 500,
        body: {
          message: 'Failed to update booking status',
          isSuccess: false,
          errors: error,
        },
      };
    }
  },
});
