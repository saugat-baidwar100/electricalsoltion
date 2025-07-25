import { Prisma } from '@prisma/client';
import { db } from './client';

export const bookingRepo = {
  create,
  findAll,
  updateStatus,
  findById,
};

async function create(input: Prisma.BookingCreateInput) {
  return db.booking.create({
    data: input,
  });
}

async function findAll() {
  return db.booking.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async function findById(id: string) {
  return db.booking.findUnique({
    where: { id },
  });
}

async function updateStatus(
  id: string,
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
) {
  return db.booking.update({
    where: { id },
    data: { status },
  });
}
