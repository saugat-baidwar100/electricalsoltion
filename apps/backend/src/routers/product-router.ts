import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { productContract } from '../../../../libs/api-contract/src/product-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { productRepo } from '../../../../libs/electric-prisma/src/product-repo';

const s = initServer();

export const productRouter = s.router(productContract, {
  getProducts: async () => {
    const products = await productRepo.findAll();
    return {
      status: 200,
      body: {
        data: products.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.image,
          price: p.price,
          description: p.description,
          categoryId: p.categoryId,
          subCategoryId: p.subCategoryId,
        })),
        isSuccess: true,
        message: 'Fetched all products',
      },
    };
  },

  getProduct: async ({ params }) => {
    const product = await productRepo.findById(params.id);
    if (!product) {
      return {
        status: 404,
        body: {
          message: 'Product not found',
          isSuccess: false,
        },
      };
    }
    return {
      status: 200,
      body: {
        data: {
          id: product.id,
          name: product.name,
          image: product.image,
          price: product.price,
          description: product.description,
          categoryId: product.categoryId,
          subCategoryId: product.subCategoryId,
        },
        isSuccess: true,
        message: 'Fetched product',
      },
    };
  },

  createProduct: async ({ body }) => {
    const created = await productRepo.create({
      name: body.name,
      image: body.image,
      price: body.price,
      description: body.description,
      category: { connect: { id: body.categoryId } },
      subCategory: { connect: { id: body.subCategoryId } },
    });

    return {
      status: 201,
      body: {
        data: {
          id: created.id,
          name: created.name,
          image: created.image,
          price: created.price,
          description: created.description,
          categoryId: created.categoryId,
          subCategoryId: created.subCategoryId,
        },
        isSuccess: true,
        message: 'Product created',
      },
    };
  },

  updateProduct: async ({ params, body }) => {
    const product = await productRepo.findById(params.id);
    if (!product) {
      return {
        status: 404,
        body: {
          message: 'Product not found',
          isSuccess: false,
        },
      };
    }

    const updated = await productRepo.updateById(params.id, {
      name: body.name,
      image: body.image,
      price: body.price,
      description: body.description,
      category: { connect: { id: body.categoryId } },
      subCategory: { connect: { id: body.subCategoryId } },
    });

    return {
      status: 200,
      body: {
        data: {
          id: updated.id,
          name: updated.name,
          image: updated.image,
          price: updated.price,
          description: updated.description,
          categoryId: updated.categoryId,
          subCategoryId: updated.subCategoryId,
        },
        isSuccess: true,
        message: 'Product updated',
      },
    };
  },

  deleteProduct: async ({ params }) => {
    const product = await productRepo.findById(params.id);
    if (!product) {
      return {
        status: 404,
        body: {
          message: 'Product not found',
          isSuccess: false,
        },
      };
    }

    const deleted = await productRepo.deleteById(params.id);
    return {
      status: 200,
      body: {
        data: {
          id: deleted.id,
          name: deleted.name,
          image: deleted.image,
          price: deleted.price,
          description: deleted.description,
          categoryId: deleted.categoryId,
          subCategoryId: deleted.subCategoryId,
        },
        isSuccess: true,
        message: 'Product deleted',
      },
    };
  },
});
