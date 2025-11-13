// db/db.js
const mongoose = require("mongoose");
// dotenv config must be in server.js, not here, to ensure env vars are loaded globally.

const uri = process.env.MONGO_DB_URL;

const connectDB = async () => {
  try {
    if (!uri) {
      throw new Error("MONGO_DB_URL is not defined in the environment.");
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host} / DB: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;