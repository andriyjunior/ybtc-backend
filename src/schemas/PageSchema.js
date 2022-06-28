const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    route: { type: String, required: true, unique: true },
    meta: {
      title: {
        en: { type: String, required: true },
        ua: { type: String },
      },
      description: {
        en: { type: String, required: true },
        ua: { type: String },
      },
    },
    body: {
      en: { type: String, required: true },
      ua: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Page = mongoose.model("page", pageSchema);

module.exports = { Page };
