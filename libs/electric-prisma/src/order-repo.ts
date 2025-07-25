import { Prisma, OrderStatus } from '@prisma/client';
import { db } from './client';

export const orderRepo = {
  create,
  findAll,
  findById,
  updateStatus,
  deleteById,
};

async function create(input: Prisma.OrderCreateInput) {
  return db.order.create({ data: input });
}

async function findAll() {
  return db.order.findMany();
}

async function findById(id: string) {
  return db.order.findUnique({ where: { id } });
}

async function updateStatus(id: string, status: OrderStatus) {
  return db.order.update({
    where: { id },
    data: { status },
  });
}

async function deleteById(id: string) {
  return db.order.delete({ where: { id } });
}
