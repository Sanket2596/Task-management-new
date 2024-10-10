import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const clerkAuth = ClerkExpressRequireAuth({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
import taskRoutes from './routes/taskRoutes.js';
import tagRoutes from './routes/tagRoutes.js';
import userRoutes from './routes/userRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import buddyRoutes from './routes/buddyRoutes.js';

app.use('/api/tasks', clerkAuth, taskRoutes);
app.use('/api/tags', clerkAuth, tagRoutes);
app.use('/api/users', clerkAuth, userRoutes);
app.use('/api/feedback', clerkAuth, feedbackRoutes);
app.use('/api/buddies', clerkAuth, buddyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
