import express, { Express } from "express";
import dotenv from "dotenv";
import GraphQLJSON from "graphql-type-json";
import { resolvers as commentResolvers } from "./resolvers/resolvers";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./schema/schema";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

dotenv.config();
const app: Express = express();
const port = process.env.PORT || 5000;

const resolvers = {
  JSON: GraphQLJSON,
  ...commentResolvers,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  await server.start();
  app.use("/api/graphql", cors(), express.json(), expressMiddleware(server));
})();

app.get("/", (req, res) => {
  const message = `Hello World! I am a Node.js server running on ${process.env.NODE_ENV} mode.`;
  console.log(message);
  res.send({ status: "success", data: { message } });
});

console.log("Starting server...");
// Start the Server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

export default app;
