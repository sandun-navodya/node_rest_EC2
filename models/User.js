// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures no two users can have the same email
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("User", userSchema);