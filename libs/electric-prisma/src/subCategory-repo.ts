import { Prisma } from '@prisma/client';
import { db } from './client';

export const subCategoryRepo = {
  create,
  findAll,
  findById,
  updateById,
  deleteById,
};

async function create(input: Prisma.SubCategoryCreateInput) {
  return db.subCategory.create({
    data: input,
  });
}

async function findAll() {
  return db.subCategory.findMany({
    include: {
      category: true, // Optional: populate parent category
    },
  });
}

async function findById(id: string) {
  return db.subCategory.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
}

async function updateById(id: string, input: Prisma.SubCategoryUpdateInput) {
  return db.subCategory.update({
    where: { id },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.subCategory.delete({
    where: { id },
  });
}
