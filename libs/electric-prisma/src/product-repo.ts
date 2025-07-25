import { Prisma } from '@prisma/client';
import { db } from './client';

export const productRepo = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};

async function create(input: Prisma.ProductCreateInput) {
  return db.product.create({ data: input });
}

async function findAll() {
  return db.product.findMany({
    include: {
      category: true,
      subCategory: true,
    },
  });
}

async function findById(id: string) {
  return db.product.findUnique({
    where: { id },
    include: {
      category: true,
      subCategory: true,
    },
  });
}

async function updateById(id: string, input: Prisma.ProductUpdateInput) {
  return db.product.update({
    where: { id },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.product.delete({
    where: { id },
  });
}
