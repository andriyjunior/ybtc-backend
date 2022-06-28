import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import routes from "./src/routes";

import { dbConnection } from "./src/db";

const { API_VERSION, PORT } = process.env;

dbConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(`/api/${API_VERSION}`, routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
