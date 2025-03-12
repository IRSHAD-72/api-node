import express from 'express';
import { connectDB } from './config/db.js';  
import userRoutes from './routes/userRoute.js';
import auth from './routes/authRoute.js';
//import roleroute from './routes/roleroute.js';
import adminRoutes from './routes/adminRoute.js';
import dotenv from "dotenv";
//import cors from 'cors';
dotenv.config();


const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use('/api', userRoutes);
app.use('/api/auth', auth);
//app.use('/api/users', roleroute);
app.use('/api/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});