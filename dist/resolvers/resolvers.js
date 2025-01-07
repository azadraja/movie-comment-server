"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const prisma_1 = __importDefault(require("../prisma/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const graphql_1 = require("graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getMovieUrl_1 = require("../utils/getMovieUrl");
exports.resolvers = {
    Query: {
        comments: (___, args, _, __) => {
            return prisma_1.default.comment.findMany({
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
        popularMovies: (_1, _a, ___1) => __awaiter(void 0, [_1, _a, ___1], void 0, function* (_, { page }, ___) {
            const res = yield fetch((0, getMovieUrl_1.getPopularMovieUrl)(page));
            return yield res.json();
        }),
        getMovie: (_2, _b, ___2) => __awaiter(void 0, [_2, _b, ___2], void 0, function* (_, { movieId }, ___) {
            const res = yield fetch((0, getMovieUrl_1.getMovieUrl)(movieId));
            return yield res.json();
        })
    },
    Movie: {
        credits: (_c, _3, __1) => __awaiter(void 0, [_c, _3, __1], void 0, function* ({ id }, _, __) {
            const res = yield fetch((0, getMovieUrl_1.getCreditsUrl)(id));
            return yield res.json();
        })
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
            return prisma_1.default.comment.create({ data: args });
        },
        login: (_, args, __) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findFirst({
                where: { email: args.email },
            });
            if (!user) {
                throw new graphql_1.GraphQLError("Invalid user", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                        http: { status: 404 },
                    },
                });
            }
            if (!bcrypt_1.default.compareSync(args.password, user.password)) {
                throw new graphql_1.GraphQLError("Username or password do not match", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                        http: { status: 401 },
                    },
                });
            }
            const token = jsonwebtoken_1.default.sign({ email: user.email }, "secret");
            console.log(`token is ${token}`);
            return Object.assign(Object.assign({}, user), { token });
        }),
        register: (parent, args, _) => {
            const hash = bcrypt_1.default.hashSync(args.password, 2);
            return prisma_1.default.user.create({
                data: { email: args.email, password: hash },
            });
        },
        deleteComment: (parent, args, _) => {
            return prisma_1.default.comment.delete({ where: { id: args.id } });
        },
        updateComment: (parent, args, _) => {
            return prisma_1.default.comment.update({
                where: { id: args.id },
                data: args,
            });
        },
    },
};
//# sourceMappingURL=resolvers.js.map