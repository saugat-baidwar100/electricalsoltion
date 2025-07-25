import { Prisma } from '@prisma/client';
import { db } from './client';

export const categoryRepo = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};

async function create(input: Prisma.CategoryCreateInput) {
  return db.category.create({
    data: input,
  });
}

async function findAll() {
  return db.category.findMany();
}

async function findById(id: string) {
  return db.category.findUnique({
    where: { id },
  });
}

async function updateById(id: string, input: Prisma.CategoryUpdateInput) {
  return db.category.update({
    where: { id },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.category.delete({
    where: { id },
  });
}
