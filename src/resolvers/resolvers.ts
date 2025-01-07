import prisma from "../prisma/prisma";
import bcrypt from "bcrypt";
import {GraphQLError} from "graphql";
import jwt from "jsonwebtoken";
import {getCreditsUrl, getMovieUrl, getPopularMovieUrl} from "../utils/getMovieUrl";

interface PopularMovieArgs {
  page: number
}

interface MovieArgs {
  movieId: number
}

interface Movie {
    id: number
    title: string
    poster_path: string
    backdrop_path: string
    vote_average: number
    overview: string
}

export const resolvers = {
  Query: {
    comments: (___, args, _, __) => {
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
    popularMovies: async(_:any, {page}:PopularMovieArgs, ___:any) => {
      const res = await fetch(getPopularMovieUrl(page))
      return await res.json()
    },
    getMovie: async(_:any, {movieId}:MovieArgs, ___:any) => {
      const res = await fetch(getMovieUrl(movieId))
      return await res.json()
    }
  },
  Movie: {
    credits: async({id}: Movie, _: any, __: any) => {
      const res = await fetch(getCreditsUrl(id))
      return await res.json()
    }
  },
  Mutation: {
    createComment: (_, args, contextValue) => {
      console.log(contextValue);
      // const token = contextValue.req.headers["authorization"];
      // if (!token)
      //   throw new GraphQLError("Username or password do not match", {
      //     extensions: {
      //       code: "UNAUTHENTICATED",
      //       http: { status: 401 },
      //     },
      //   });
      // try {
      //   jwt.verify(token, "secret");
      // } catch (error) {
      //   throw new GraphQLError("Username or password do not match", {
      //     extensions: {
      //       code: "UNAUTHENTICATED",
      //       http: { status: 401 },
      //     },
      //   });
      // }
      return prisma.comment.create({ data: args });
    },
    login: async (_, args, __) => {
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
    register: (parent, args, _) => {
      const hash = bcrypt.hashSync(args.password, 2);
      return prisma.user.create({
        data: { email: args.email, password: hash },
      });
    },
    deleteComment: (parent, args, _) => {
      return prisma.comment.delete({ where: { id: args.id } });
    },
    updateComment: (parent, args, _) => {
      return prisma.comment.update({
        where: { id: args.id },
        data: args,
      });
    },
  },
};
