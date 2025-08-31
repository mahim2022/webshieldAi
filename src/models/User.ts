// src/models/User.ts
import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = models.User || model("User", UserSchema);
export default User;
