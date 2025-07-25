import { Prisma } from '@prisma/client';
import { db } from './client';

export const userRepo = {
  findAll,
  findById,
  updateById,
  deleteById,
  create,
};

async function findAll() {
  return db.user.findMany();
}

async function findById(id: string) {
  return db.user.findUnique({
    where: { id },
  });
}

async function updateById(id: string, input: Prisma.UserUpdateInput) {
  return db.user.update({
    where: { id },
    data: input,
  });
}

async function deleteById(id: string) {
  return db.user.delete({
    where: { id },
  });
}
async function create(input: Prisma.UserCreateInput) {
  return db.user.create({
    data: input,
  });
}
