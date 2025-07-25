import { initServer } from '@ts-rest/express';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { userContract } from '../../../../libs/api-contract/src/user-contract';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { userRepo } from '../../../../libs/electric-prisma/src/user-repo';
import { authMiddleware, roleGuard } from '../routers/auth-middleware';
import { Role } from '@prisma/client';

const s = initServer();

export const userRouter = s.router(userContract, {
  getUsers: {
    // middleware: [authMiddleware, roleGuard(['admin'])],
    handler: async () => {
      const users = await userRepo.findAll();
      return {
        status: 200,
        body: {
          data: users.map((user) => ({
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            role: user.role.toLowerCase() as 'user' | 'manager' | 'admin',
          })),
          isSuccess: true,
          message: 'Fetched all users',
        },
      };
    },
  },

  getUser: {
    middleware: [authMiddleware, roleGuard(['admin'])],
    handler: async ({ params }) => {
      const user = await userRepo.findById(params.id);
      if (!user) {
        return {
          status: 404,
          body: {
            message: 'User not found',
            isSuccess: false,
          },
        };
      }
      return {
        status: 200,
        body: {
          data: {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            role: user.role.toLowerCase() as 'user' | 'manager' | 'admin',
          },
          isSuccess: true,
          message: 'Fetched user',
        },
      };
    },
  },

  createUser: {
    middleware: [authMiddleware, roleGuard(['admin'])],
    handler: async ({ body }) => {
      const createdUser = await userRepo.create({
        email: body.email,
        fullname: body.fullname,
        username: body.username,
        role: body.role.toUpperCase() as Role, // Ensure this matches your Prisma Role enum
        password: body.password, // hash it if needed in repo
      });

      return {
        status: 201,
        body: {
          data: {
            id: createdUser.id,
            email: createdUser.email,
            fullname: createdUser.fullname,
            username: createdUser.username,
            role: createdUser.role.toLowerCase() as 'user' | 'manager' | 'admin',
          },
          isSuccess: true,
          message: 'User created successfully',
        },
      };
    },
  },

 updateUser: {
  middleware: [authMiddleware, roleGuard(['admin'])],
  handler: async ({ params, body }) => {
    if (!body.role) {
      return {
        status: 400,
        body: {
          message: 'Role is required',
          isSuccess: false,
        },
      };
    }

    const existingUser = await userRepo.findById(params.id);
    if (!existingUser) {
      return {
        status: 404,
        body: {
          message: 'User not found',
          isSuccess: false,
        },
      };
    }

    const updated = await userRepo.updateById(params.id, {
      fullname: body.fullname,
      username: body.username,
      role: body.role
    });

    return {
      status: 200,
      body: {
        data: {
          id: updated.id,
          email: updated.email,
          fullname: updated.fullname,
          username: updated.username,
          role: updated.role.toLowerCase() as 'user' | 'manager' | 'admin',
        },
        isSuccess: true,
        message: 'User updated successfully',
      },
    };
  },
},


  deleteUser: {
    middleware: [authMiddleware, roleGuard(['admin'])],
    handler: async ({ params }) => {
      const existingUser = await userRepo.findById(params.id);
      if (!existingUser) {
        return {
          status: 404,
          body: {
            message: 'User not found',
            isSuccess: false,
          },
        };
      }

      const deleted = await userRepo.deleteById(params.id);

      return {
        status: 200,
        body: {
          data: {
            id: deleted.id,
            email: deleted.email,
            fullname: deleted.fullname,
            username: deleted.username,
            role: deleted.role.toLowerCase() as 'user' | 'manager' | 'admin',
          },
          isSuccess: true,
          message: 'User deleted successfully',
        },
      };
    },
  },
});
