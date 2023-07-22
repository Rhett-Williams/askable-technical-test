import fastify from "fastify";
import express from "express";
import routes from "./routes";
import { Database } from "./data/Database";

const app = express();
const port = 3000;

app.use("/", routes);

app.listen({ port }, () => {
  console.log(`Listening on port ${port}`);
});
