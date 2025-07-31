import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();
connectDB();

const app = express();

// ======================
// Global Middleware Setup
// ======================

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',  // ✅ allow requests from frontend
  credentials: true                // ✅ allow cookies, headers, etc.
}));

// ✅ Handle preflight (OPTIONS) requests
app.options('*', cors());

// Log every request for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// Security headers
app.use(helmet());

// Dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiter to avoid abuse
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100                  // limit each IP to 100 requests per windowMs
}));

// ======================
// Route Definitions
// ======================
app.use('/api/auth', authRoutes);       // Auth: register, login
app.use('/api/users', userRoutes);      // User profiles, roles
app.use('/api/students', studentRoutes); // Student CRUD

// ======================
// Health Check Endpoint
// ======================
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ======================
// Global Error Handlers
// ======================
app.use(notFound);       // 404 handler
app.use(errorHandler);   // Custom error response formatter

// ======================
// Start Server
// ======================
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
