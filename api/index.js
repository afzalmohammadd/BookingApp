import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

// Database connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MONGODB connection: Succesfully");
  } catch (error) {
    console.log("MONGODB connection: failed")
    throw error
  }
};

// MongoDB disconnected event
mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!");
})

// MongoDB connected event
mongoose.connection.on("connected", ()=>{
    console.log("mongoDB connected!");
})

// Initiating the server to listen on port 8800
app.listen(8800, () => {
    connect()
  console.log("Connected to backend ");
});