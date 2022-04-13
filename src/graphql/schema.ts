import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: String
    name: String
    email: String
    password: String
    projects: [Project]
  }

  type Project {
    id: Int
    title: String
    status: String
    members: [User]
  }

  "Queries to GET data"
  type Query {
    """
    Get all users
    """
    users: [User]
    """
    Get project by id(int)
    """
    project(id: Int!): Project
    """
    Get all projects
    """
    projects: [Project]
  }

  "Add and delete data"
  type Mutation {
    createUser(args: UserInput!): User
    createProject(args: ProjectInput!): Project
    deleteUser(
      """
      uuid argument
      """
      id: String!
    ): Boolean
    deleteProject(id: Int!): Boolean
  }

  input UserInput {
    name: String
    email: String
    password: String
  }

  input ProjectInput {
    title: String
    status: String
  }
`;
