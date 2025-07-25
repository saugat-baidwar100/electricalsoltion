
import { Prisma } from '@prisma/client';
import { db } from './client';

export const serviceRepo = {
  findAll,
  findById,
  create,
  updateById,
  deleteById,
};

async function findAll(city: string) {
  return db.service.findMany({
    where: { city },
  });
}

async function findById(id: string) {
  return db.service.findUnique({
    where: { id },
  });
}

async function create(input: Prisma.ServiceCreateInput) {
  return db.service.create({
    data: input,
  });
}

async function updateById(id: string, input: Prisma.ServiceUpdateInput) {
  return db.service.update({
    where: { id },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.service.delete({
    where: { id },
  });
}
