import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { subCategoryContract } from '../../../../libs/api-contract/src/subCategory-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { subCategoryRepo } from '../../../../libs/electric-prisma/src/subCategory-repo';

const s = initServer();

export const subCategoryRouter = s.router(subCategoryContract, {
  getSubCategories: async () => {
    console.log('getall .........');
    const subcategories = await subCategoryRepo.findAll();
    return {
      status: 200,
      body: {
        data: subcategories.map((sc) => ({
          id: sc.id,
          name: sc.name,
          categoryId: sc.categoryId,
        })),
        isSuccess: true,
        message: 'Fetched all subcategories with category',
      },
    };
  },

  getSubCategory: async ({ params }) => {
    console.log('getall');
    const sc = await subCategoryRepo.findById(params.id);
    if (!sc) {
      return {
        status: 404,
        body: {
          message: 'Subcategory not found',
          isSuccess: false,
        },
      };
    }
    return {
      status: 200,
      body: {
        data: {
          id: sc.id,
          name: sc.name,
          categoryId: sc.categoryId,
        },
        isSuccess: true,
        message: 'Fetched subcategory',
      },
    };
  },

  createSubCategory: async ({ body }) => {
    const sc = await subCategoryRepo.create({
      name: body.name,
      category: {
        connect: { id: body.categoryId },
      },
    });
    return {
      status: 201,
      body: {
        data: {
          id: sc.id,
          name: sc.name,
          categoryId: sc.categoryId,
        },
        isSuccess: true,
        message: 'Subcategory created successfully',
      },
    };
  },

  updateSubCategory: async ({ params, body }) => {
    const existing = await subCategoryRepo.findById(params.id);
    if (!existing) {
      return {
        status: 404,
        body: {
          message: 'Subcategory not found',
          isSuccess: false,
        },
      };
    }

    const updated = await subCategoryRepo.updateById(params.id, {
      name: body.name,
      category: {
        connect: { id: body.categoryId },
      },
    });

    return {
      status: 200,
      body: {
        data: {
          id: updated.id,
          name: updated.name,
          categoryId: updated.categoryId,
        },
        isSuccess: true,
        message: 'Subcategory updated successfully',
      },
    };
  },

  deleteSubCategory: async ({ params }) => {
    const existing = await subCategoryRepo.findById(params.id);
    if (!existing) {
      return {
        status: 404,
        body: {
          message: 'Subcategory not found',
          isSuccess: false,
        },
      };
    }

    const deleted = await subCategoryRepo.deleteById(params.id);
    return {
      status: 200,
      body: {
        data: {
          id: deleted.id,
          name: deleted.name,
          categoryId: deleted.categoryId,
        },
        isSuccess: true,
        message: 'Subcategory deleted successfully',
      },
    };
  },
});
