import db from '../models';
import { v4 as uuidv4 } from 'uuid';

interface project {
  id: number;
  title: string;
  status: string;
}

interface user {
  id: string;
  name: string;
  email: string;
  Projects: project[];
}

export const createUser = (args: {
  name: string;
  email: string;
  password: string;
}): Promise<user> => {
  return db.User.create({
    id: uuidv4(),
    name: args.name,
    email: args.email,
    password: args.password,
  });
};

export const createProject = async (args: {
  title: string;
  status: string;
}): Promise<project> => {
  return db.Project.create({
    title: args.title,
    status: args.status,
  });
};

export const getProject = async (id: Number) => {
  const project: project = await db.Project.findByPk(id);
  return project;
};

export const getUsers = async (): Promise<user[]> => {
  const userdata = await db.User.findAll({
    include: {
      model: db.Project,
      through: {
        attributes: [],
      },
    },
  });
  const users = await userdata.map((user: user): object => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      projects: user.Projects,
    };
  });
  return users;
};

export const getProjects = async (): Promise<project[]> => {
  const projectdata = await db.Project.findAll();
  const projects = await projectdata.map((project: project) => {
    return {
      id: project.id,
      title: project.title,
      status: project.status,
    };
  });
  return projects;
};

export const deleteProject = async (id: number): Promise<boolean> => {
  const count = await db.Project.destroy({ where: { id: id } });
  if (count === 1) {
    return true;
  } else {
    return false;
  }
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const count = await db.User.destroy({ where: { id: id } });
  if (count === 1) {
    return true;
  } else {
    return false;
  }
};
