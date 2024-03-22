import express from "express";
import dotenv from "dotenv";
import GraphQLJSON from "graphql-type-json";
import { resolvers as commentResolvers } from "./resolvers/resolvers";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/schema";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
dotenv.config();
const resolvers = {
    JSON: GraphQLJSON,
    ...commentResolvers,
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});
const app = express();
const port = process.env.PORT || 3000;
await server.start();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use("/graphql", cors(), express.json(), expressMiddleware(server));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=index.js.map