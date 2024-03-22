import express, { Express, Request, Response } from "express";
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

const app: Express = express();
const port = process.env.PORT || 3000;
(async () => {
  await server.start();
  app.use("/api/graphql", cors(), express.json(), expressMiddleware(server));
})();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export default app;
