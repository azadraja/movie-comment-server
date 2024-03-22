import prisma from "../../lib/prisma";

export const resolvers = {
  Query: {
    comments: (parent: any, args: any, contextValue: any, info: any) => {
      return prisma.comment.findMany({
        where: { movieId: { equals: args.movieId } },
        include: {
          replies: {
            include: {
              replies: true,
            },
          },
        },
      });
    },
  },
  Mutation: {
    createComment: (parent: any, args: any, contextValue: any) => {
      return prisma.comment.create({ data: args });
    },
    deleteComment: (parent: any, args: any, contextValue: any) => {
      return prisma.comment.delete({ where: { id: args.id } });
    },
    // createReply(commentId: Int!, replyId: Int, content: JSON!, author: String!): Reply!
    createReply: (parent: any, args: any) => {
      return prisma.reply.create({ data: args });
    },
    updateComment: (parent: any, args: any, contextValue: any) => {
      return prisma.comment.update({
        where: { id: args.id },
        data: args,
      });
    },
  },
};
