import { fileURLToPath } from 'url'; // Importing fileURLToPath function from the 'url' module
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import propertyTypeRoute from './routes/property.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';

const __filename = fileURLToPath(import.meta.url); // Convert the file URL to file path
const __dirname = path.dirname(__filename); // Get the directory name

const app = express();
dotenv.config();

// Database connection
async function connect() {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log('MONGODB connection: Successfully');
  } catch (error) {
    console.log('MONGODB connection: failed');
    throw error;
  }
}

// MongoDB disconnected event
mongoose.connection.on('disconnected', () => {
  console.log('mongoDB disconnected!');
});

// Middlewares
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods : ["GET" , "POST" , "PUT" , "PATCH" , "DELETE"],
  credentials: true // Allow cookies to be sent with the request
}));
app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/propertyType',propertyTypeRoute)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// Initiating the server to listen on port 8800
app.listen(8800, async () => {
  await connect();
  console.log('Connected to backend.');
});
