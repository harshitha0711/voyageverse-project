import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookings.js';
import reviewRoutes from './routes/reviews.js';
import wishlistRoutes from './routes/wishlist.js';
import weatherRoutes from './routes/weather.js';

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

// Allow cross-origin API access during development
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5000', 
    'http://127.0.0.1:5000', 
    'http://127.0.0.1:5500', 
    'http://localhost:5500',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://voyageverse-frontend.onrender.com'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  }
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/weather', weatherRoutes);

// Default error handler middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
