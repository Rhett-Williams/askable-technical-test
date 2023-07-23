import express from "express";
import routes from "./routes";
import cors from "cors";

const app = express();
const port = 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", routes);

app.listen({ port }, () => {
  console.log(`Listening on port ${port}`);
});
