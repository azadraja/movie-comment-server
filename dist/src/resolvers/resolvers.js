import prisma from "../../lib/prisma";
export const resolvers = {
    Query: {
        comments: (parent, args, contextValue, info) => {
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
        createComment: (parent, args, contextValue) => {
            return prisma.comment.create({ data: args });
        },
        deleteComment: (parent, args, contextValue) => {
            return prisma.comment.delete({ where: { id: args.id } });
        },
        // createReply(commentId: Int!, replyId: Int, content: JSON!, author: String!): Reply!
        createReply: (parent, args) => {
            return prisma.reply.create({ data: args });
        },
        updateComment: (parent, args, contextValue) => {
            return prisma.comment.update({
                where: { id: args.id },
                data: args,
            });
        },
    },
};
//# sourceMappingURL=resolvers.js.map