import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "admin",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", schema);
