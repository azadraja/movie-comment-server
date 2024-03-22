export const typeDefs = `
  scalar JSON
  type Comment {
    id: ID
    movieId: Int
    content: JSON
    author: String
    createdAt: String
    updatedAt: String
    replies: [Reply]
  }

  type Reply {
    id: ID
    commentId: Int
    replyId: Int
    content: JSON
    author: String
    createdAt: String
    updatedAt: String
    replies: [Reply]
  }

  type Query {
    comments(movieId: Int!): [Comment]!
  }

  type Mutation {
    createComment(movieId: Int!, content: JSON!, author: String!): Comment!
    createReply(commentId: Int, replyId: Int, content: JSON!, author: String!): Reply!
    deleteComment(id: Int!): Comment!
    updateComment(id: Int!, movieId: Int!, content: JSON!, author: String!): Comment!
  }
`;
//# sourceMappingURL=schema.js.map