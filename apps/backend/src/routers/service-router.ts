import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { serviceContract } from '../../../../libs/api-contract/src/services-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { serviceRepo } from '../../../../libs/electric-prisma/src/service-repo';

const s = initServer();

export const serviceRouter = s.router(serviceContract, {
  getAllServices: async ({ query }) => {
    const services = await serviceRepo.findAll(query.city);
    return {
      status: 200,
      body: {
        data: services,
        isSuccess: true,
        message: 'Fetched services for city: ' + query.city,
      },
    };
  },

  getService: async ({ params }) => {
    const service = await serviceRepo.findById(params.id);
    if (!service) {
      return {
        status: 404,
        body: {
          message: 'Service not found',
          isSuccess: false,
        },
      };
    }

    return {
      status: 200,
      body: {
        data: service,
        isSuccess: true,
        message: 'Fetched service',
      },
    };
  },

  createService: async ({ body }) => {
    const newService = await serviceRepo.create(body);
    return {
      status: 201,
      body: {
        data: newService,
        isSuccess: true,
        message: 'Service created',
      },
    };
  },

  updateService: async ({ params, body }) => {
    const exists = await serviceRepo.findById(params.id);
    if (!exists) {
      return {
        status: 404,
        body: {
          message: 'Service not found',
          isSuccess: false,
        },
      };
    }

    const updated = await serviceRepo.updateById(params.id, body);
    return {
      status: 200,
      body: {
        data: updated,
        isSuccess: true,
        message: 'Service updated',
      },
    };
  },

  deleteService: async ({ params }) => {
    const exists = await serviceRepo.findById(params.id);
    if (!exists) {
      return {
        status: 404,
        body: {
          message: 'Service not found',
          isSuccess: false,
        },
      };
    }

    await serviceRepo.deleteById(params.id);
    return {
      status: 200,
      body: {
        isSuccess: true,
        message: 'Service deleted',
      },
    };
  },
});
