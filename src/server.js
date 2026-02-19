import express from 'express';
import movieroutes from './routes/movieroutes.js';
import {config} from 'dotenv';
config();
import authroutes from './routes/authroutes.js'; // Import auth routes

import { disconnectDB,connectDB} from './config/db.js';
connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));  

app.get('/',(req,res) =>{
    res.send('Hello World');
})

app.use('/api/movie', movieroutes);
app.use('/api/auth', authroutes); // Import and use auth routes

const server = app.listen(port,"0.0.0.0",() =>{
    console.log(`Server is running on port ${port}`);
})

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
}); 
 
 
