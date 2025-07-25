/* eslint-disable @typescript-eslint/no-explicit-any */
import { createExpressEndpoints } from '@ts-rest/express';

import { logger } from '../utils/logger';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { categoryContract } from '../../../../libs/api-contract/src/category-contract';
import { categoryRouter } from './category-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { subCategoryContract } from '../../../../libs/api-contract/src/subCategory-contract';
import { subCategoryRouter } from './subCategory-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { productContract } from '../../../../libs/api-contract/src/product-contract';
import { productRouter } from './product-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { serviceContract } from '../../../../libs/api-contract/src/services-contract';
import { serviceRouter } from './service-router';
import { orderRouter } from './order-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { orderContract } from '../../../../libs/api-contract/src/orders-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { bookingContract } from '../../../../libs/api-contract/src/booking-contract';
import { bookingRouter } from './booking-router';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { authContract } from '../../../../libs/api-contract/src/auth-contract';
import { authRouter } from './auth-router';
import { userRouter } from './user-router';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { userContract } from '../../../../libs/api-contract/src/user-contract';
// import { authRouter } from './auth-router';

const routers = [
  {
    contract: categoryContract,
    router: categoryRouter,
  },
  {
    contract: subCategoryContract,
    router: subCategoryRouter,
  },
  {
    contract: productContract,
    router: productRouter,
  },
  {
    contract: serviceContract,
    router: serviceRouter,
  },
  {
    contract: orderContract,
    router: orderRouter,
  },
  {
    contract: bookingContract,
    router: bookingRouter,
  },
  {
    contract: authContract,
    router: authRouter,
  },
  {
    contract: userContract,
    router: userRouter,
  },
];
export function generateEndPoints(app: any) {
  return routers.map(({ contract, router }) => {
    createExpressEndpoints(contract, router, app, {
      logInitialization: true,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      requestValidationErrorHandler(err, req, res, next) {
        logger.error(err, 'Request validation error');
        res.status(400).json({
          error: 'Request validation error',
          isSuccess: false,
          fieldErrors: err.body?.flatten().fieldErrors,
        });
      },
    });
  });
}
