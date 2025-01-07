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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_type_json_1 = __importDefault(require("graphql-type-json"));
const resolvers_1 = require("./resolvers/resolvers");
const server_1 = require("@apollo/server");
const schema_1 = require("./schema/schema");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4001;
const resolvers = Object.assign({ JSON: graphql_type_json_1.default }, resolvers_1.resolvers);
const server = new server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield server.start();
    app.use("/api/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            return { req };
        }),
    }));
}))();
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
exports.default = app;
//# sourceMappingURL=index.js.map