import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

// Database connection
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("MONGODB connection: Succesfully");
  } catch (error) {
    console.log("MONGODB connection: failed");
    throw error;
  }
}

// MongoDB disconnected event
mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

// Middlewares
app.use(cookieParser())
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{ 
  const errorStatus = err.status || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(500).json(errorStatus).json({
    success:false,
    status:errorStatus,
    message:errorMessage,
    stack:err.stack
  })
})

// Initiating the server to listen on port 8800
app.listen(8800, async () => {
  await connect();
  console.log("Connected to backend.");
});
