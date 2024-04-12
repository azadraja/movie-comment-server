"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
  scalar JSON
  type Comment {
    id: ID
    movieId: Int
    content: JSON
    author: String
    createdAt: String
    updatedAt: String
    parentId: Int
    children: [Comment]
  }

  type User {
    id: ID
    email: String
    createdAt: String
    updatedAt: String
    token: String
  }

  type Query {
    comments(movieId: Int!): [Comment]!
  }

  type Mutation {
    register(email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    createComment(movieId: Int!, content: JSON!, author: String!, parentId: Int): Comment!
    deleteComment(id: Int!): Comment!
    updateComment(id: Int!, movieId: Int!, content: JSON!, author: String!): Comment!
  }
`;
//# sourceMappingURL=schema.js.map