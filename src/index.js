const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const routes = require("./routes");

const { dbConnection } = require("./db");

const { API_VERSION, PORT } = process.env;

dbConnection();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(`/api/${API_VERSION}`, routes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
