import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from './swaggerMain';

// we need to use the  contract to generate the OpenAPI spec for all routes

export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: 'Courses API',
    version: '1.0.0',
  },
});
