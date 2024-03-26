"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
exports.resolvers = {
    Query: {
        comments: (parent, args, contextValue, info) => {
            return prisma_1.default.comment.findMany({
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
            return prisma_1.default.comment.create({ data: args });
        },
        deleteComment: (parent, args, contextValue) => {
            return prisma_1.default.comment.delete({ where: { id: args.id } });
        },
        // createReply(commentId: Int!, replyId: Int, content: JSON!, author: String!): Reply!
        createReply: (parent, args) => {
            return prisma_1.default.reply.create({ data: args });
        },
        updateComment: (parent, args, contextValue) => {
            return prisma_1.default.comment.update({
                where: { id: args.id },
                data: args,
            });
        },
    },
};
//# sourceMappingURL=resolvers.js.map