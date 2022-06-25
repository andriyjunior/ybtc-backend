import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    instagram: { type: String },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

export { User };
