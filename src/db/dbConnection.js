const mongoose = require("mongoose");

const { DB_NAME, DB_PASS, DB_USERNAME } = process.env;

const uri = `mongodb+srv://${DB_USERNAME}:${DB_PASS}@cluster0.dd6uo.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

const dbConnection = () => {
  mongoose.connect(uri, () => {
    console.log(`Connected to ${DB_NAME}`);
  });
};

module.exports = { dbConnection };
