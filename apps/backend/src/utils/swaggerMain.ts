// eslint-disable-next-line @nx/enforce-module-boundaries
import { subCategoryContract } from '../../../../libs/api-contract/src/subCategory-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { categoryContract } from '../../../../libs/api-contract/src/category-contract';
import { initContract } from '@ts-rest/core';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { productContract } from '../../../../libs/api-contract/src/product-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { serviceContract } from '../../../../libs/api-contract/src/services-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { orderContract } from '../../../../libs/api-contract/src/orders-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { bookingContract } from '../../../../libs/api-contract/src/booking-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { authContract } from '../../../../libs/api-contract/src/auth-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { userContract } from '../../../../libs/api-contract/src/user-contract';

const c = initContract();

export const contract = c.router({
  category: categoryContract,
  subcategory: subCategoryContract,
  product: productContract,
  service: serviceContract,
  order: orderContract,
  booking: bookingContract,
  authrouter: authContract,
  user:userContract
});
