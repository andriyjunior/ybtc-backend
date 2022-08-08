const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
require("./src/db");

const routes = require("./src/routes");

const { API_VERSION, PORT } = process.env;

const port = PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(cors());

// app.get(`/`, (req, res) => res.send({ text: "HEllo!" }));
app.use(`/api/${API_VERSION}`, routes);

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
