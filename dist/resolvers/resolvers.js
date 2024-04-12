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
exports.resolvers = {
    Query: {
        comments: (parent, args, contextValue, info) => {
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
    },
    Mutation: {
        createComment: (parent, args, contextValue) => {
            console.log(contextValue);
            const token = contextValue.req.headers["authorization"];
            if (!token)
                throw new graphql_1.GraphQLError("Username or password do not match", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                        http: { status: 401 },
                    },
                });
            try {
                jsonwebtoken_1.default.verify(token, "secret");
            }
            catch (error) {
                throw new graphql_1.GraphQLError("Username or password do not match", {
                    extensions: {
                        code: "UNAUTHENTICATED",
                        http: { status: 401 },
                    },
                });
            }
            return prisma_1.default.comment.create({ data: args });
        },
        login: (parent, args, contextValue) => __awaiter(void 0, void 0, void 0, function* () {
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
        register: (parent, args, contextValue) => {
            const hash = bcrypt_1.default.hashSync(args.password, 2);
            return prisma_1.default.user.create({
                data: { email: args.email, password: hash },
            });
        },
        deleteComment: (parent, args, contextValue) => {
            return prisma_1.default.comment.delete({ where: { id: args.id } });
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