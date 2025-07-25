import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { orderContract } from '../../../../libs/api-contract/src/orders-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { orderRepo } from '../../../../libs/electric-prisma/src/order-repo';

const s = initServer();

export const orderRouter = s.router(orderContract, {
  getOrders: async () => {
    const orders = await orderRepo.findAll();
    return {
      status: 200,
      body: {
        data: orders.map((order) => ({
          id: order.id,
          userId: order.userId,
          type: order.type,
          status: order.status,
          productId: order.productId ?? null,
          serviceId: order.serviceId ?? null,
          address: order.address,
          phone: order.phone,
          notes: order.notes ?? null,
          createdAt: order.createdAt.toISOString(),
        })),
        isSuccess: true,
        message: 'All orders fetched',
      },
    };
  },

  getOrder: async ({ params }) => {
    const order = await orderRepo.findById(params.id);
    if (!order) {
      return {
        status: 404,
        body: {
          message: 'Order not found',
          isSuccess: false,
        },
      };
    }

    return {
      status: 200,
      body: {
        data: {
          id: order.id,
          userId: order.userId,
          type: order.type,
          status: order.status,
          productId: order.productId ?? null,
          serviceId: order.serviceId ?? null,
          address: order.address,
          phone: order.phone,
          notes: order.notes ?? null,
          createdAt: order.createdAt.toISOString(),
        },
        isSuccess: true,
        message: 'Order fetched',
      },
    };
  },

  createOrder: async ({ body }) => {
    const created = await orderRepo.create({
      user: { connect: { id: body.userId } },
      type: body.type,
      product: body.productId ? { connect: { id: body.productId } } : undefined,
      service: body.serviceId ? { connect: { id: body.serviceId } } : undefined,
      address: body.address,
      phone: body.phone,
      notes: body.notes ?? undefined,
    });

    return {
      status: 201,
      body: {
        data: {
          id: created.id,
          userId: created.userId,
          type: created.type,
          status: created.status,
          productId: created.productId ?? null,
          serviceId: created.serviceId ?? null,
          address: created.address,
          phone: created.phone,
          notes: created.notes ?? null,
          createdAt: created.createdAt.toISOString(),
        },
        isSuccess: true,
        message: 'Order created',
      },
    };
  },

  updateOrderStatus: async ({ params, body }) => {
    const order = await orderRepo.findById(params.id);
    if (!order) {
      return {
        status: 404,
        body: {
          message: 'Order not found',
          isSuccess: false,
        },
      };
    }

    const updated = await orderRepo.updateStatus(params.id, body.status);

    return {
      status: 200,
      body: {
        data: {
          id: updated.id,
          userId: updated.userId,
          type: updated.type,
          status: updated.status,
          productId: updated.productId ?? null,
          serviceId: updated.serviceId ?? null,
          address: updated.address,
          phone: updated.phone,
          notes: updated.notes ?? null,
          createdAt: updated.createdAt.toISOString(),
        },
        isSuccess: true,
        message: 'Order status updated',
      },
    };
  },

  deleteOrder: async ({ params }) => {
    const order = await orderRepo.findById(params.id);
    if (!order) {
      return {
        status: 404,
        body: {
          message: 'Order not found',
          isSuccess: false,
        },
      };
    }

    const deleted = await orderRepo.deleteById(params.id);

    return {
      status: 200,
      body: {
        data: {
          id: deleted.id,
          userId: deleted.userId,
          type: deleted.type,
          status: deleted.status,
          productId: deleted.productId ?? null,
          serviceId: deleted.serviceId ?? null,
          address: deleted.address,
          phone: deleted.phone,
          notes: deleted.notes ?? null,
          createdAt: deleted.createdAt.toISOString(),
        },
        isSuccess: true,
        message: 'Order deleted',
      },
    };
  },
});
