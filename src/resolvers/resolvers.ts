import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    comments: (parent, args, contextValue, info) => {
      return prisma.comment.findMany({
        where: {
          movieId: { equals: args.movieId },
          parentId: null,
        },
        include: {
          children: {
            include: {
              children: true,
            },
          },
        },
      });
    },
  },
  Mutation: {
    createComment: (parent, args, contextValue) => {
      console.log(contextValue);
      const token = contextValue.req.headers["authorization"];
      if (!token)
        throw new GraphQLError("Username or password do not match", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      try {
        jwt.verify(token, "secret");
      } catch (error) {
        throw new GraphQLError("Username or password do not match", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      return prisma.comment.create({ data: args });
    },
    login: async (parent, args, contextValue) => {
      const user = await prisma.user.findFirst({
        where: { email: args.email },
      });
      if (!user) {
        throw new GraphQLError("Invalid user", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 404 },
          },
        });
      }
      if (!bcrypt.compareSync(args.password, user.password)) {
        throw new GraphQLError("Username or password do not match", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const token = jwt.sign({ email: user.email }, "secret");
      console.log(`token is ${token}`);
      return { ...user, token };
    },
    register: (parent, args, contextValue) => {
      const hash = bcrypt.hashSync(args.password, 2);
      return prisma.user.create({
        data: { email: args.email, password: hash },
      });
    },
    deleteComment: (parent, args, contextValue) => {
      return prisma.comment.delete({ where: { id: args.id } });
    },
    updateComment: (parent, args, contextValue) => {
      return prisma.comment.update({
        where: { id: args.id },
        data: args,
      });
    },
  },
};
