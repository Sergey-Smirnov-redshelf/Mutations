import {
  createUser,
  createProject,
  getUsers,
  getProjects,
  getProject,
  deleteUser,
  deleteProject,
} from '../utils';

export const resolvers = {
  Query: {
    users: async () => getUsers(),
    project: async (_: any, { id }: any, context: any) => getProject(id),
    projects: async () => getProjects(),
  },

  Mutation: {
    createUser: async (_: any, { args }: any, context: any) => {
      const user = await createUser(args);
      return user;
    },

    createProject: async (_: any, { args }: any, context: any) => {
      const project = await createProject(args);
      return project;
    },

    deleteUser: async (_: any, { id }: any, context: any) => {
      const isDeleted = await deleteUser(id);
      return isDeleted;
    },

    deleteProject: async (_: any, { id }: any, context: any) => {
      const isDeleted = await deleteProject(id);
      return isDeleted;
    },
  },
};
