// backend/middleware/errorMiddleware.js

// Middleware to handle 404 (Not Found) errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Generic error handling middleware
const errorHandler = (err, req, res, next) => {
  // Sometimes Express returns a 200 status even on an error, so we explicitly check
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    // Only show the stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };