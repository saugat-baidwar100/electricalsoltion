import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { categoryContract } from '../../../../libs/api-contract/src/category-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { categoryRepo } from '../../../../libs/electric-prisma/src/category-repo';

const s = initServer();

export const categoryRouter = s.router(categoryContract, {
  getCategories: async () => {
    const categories = await categoryRepo.findAll();
    return {
      status: 200,
      body: {
        data: categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
          image: cat.image,
          description: cat.description,
        })),
        isSuccess: true,
        message: 'Fetched all categories',
      },
    };
  },

  getCategory: async ({ params }) => {
    const cat = await categoryRepo.findById(params.id);
    if (!cat) {
      return {
        status: 404,
        body: {
          message: 'Category not found',
          isSuccess: false,
        },
      };
    }
    return {
      status: 200,
      body: {
        data: {
          id: cat.id,
          name: cat.name,
          image: cat.image,
          description: cat.description,
        },
        isSuccess: true,
        message: 'Fetched category',
      },
    };
  },

  createCategory: async ({ body }) => {
    const cat = await categoryRepo.create({
      name: body.name,
      image: body.image,
      description: body.description,
    });
    return {
      status: 201,
      body: {
        data: {
          id: cat.id,
          name: cat.name,
          image: cat.image,
          description: cat.description,
        },
        isSuccess: true,
        message: 'Category created successfully',
      },
    };
  },

  updateCategory: async ({ params, body }) => {
    const existing = await categoryRepo.findById(params.id);
    if (!existing) {
      return {
        status: 404,
        body: {
          message: 'Category not found',
          isSuccess: false,
        },
      };
    }

    const updated = await categoryRepo.updateById(params.id, {
      name: body.name,
      image: body.image,
      description: body.description,
    });

    return {
      status: 200,
      body: {
        data: {
          id: updated.id,
          name: updated.name,
          image: updated.image,
          description: updated.description,
        },
        isSuccess: true,
        message: 'Category updated successfully',
      },
    };
  },

  deleteCategory: async ({ params }) => {
    const existing = await categoryRepo.findById(params.id);
    if (!existing) {
      return {
        status: 404,
        body: {
          message: 'Category not found',
          isSuccess: false,
        },
      };
    }

    const deleted = await categoryRepo.deleteById(params.id);

    return {
      status: 200,
      body: {
        data: {
          id: deleted.id,
          name: deleted.name,
          image: deleted.image,
          description: deleted.description,
        },
        isSuccess: true,
        message: 'Category deleted successfully',
      },
    };
  },
});
