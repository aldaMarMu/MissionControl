require("dotenv").config();

import * as mongoose from "mongoose";
import { contextController } from "./controllers/context";
import exSchema from "./schemas/allSchemas";

import Koa = require("koa");
const { ApolloServer, AuthenticationError } = require("apollo-server-koa");

const PORT = process.env.PORT;

const mongoUrl: string = process.env.MONGO_URL;

mongoose.set("debug", true);
mongoose.set("useFindAndModify", false); // ojo con esto al desplegar
mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useCreateIndex: true },
  (err: any) => {
    if (err) {
      throw err;
    }

    console.log("Successfully connected to Mongo");
  }
);

const app = new Koa();
const httpServer = app.listen(
  PORT,
  () => console.log(`🚀 Server ready at http://localhost:${PORT}`)
  //console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`),
  //console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
);

const server = new ApolloServer({
  context: async ({ ctx, req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      const user = await contextController.getMyUser(ctx);
      return { user, headers: ctx.headers }; //  add the user to the ctx
    }
  },
  schema: exSchema,
});

server.applyMiddleware({ app });
