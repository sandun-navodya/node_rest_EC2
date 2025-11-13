// middlewares/errorhandler.js
const errorHandler = (err, req, res, next) => {
  // Use the status code already set by the controller, or default to 500
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    // In development, you might show the stack, but remove this for production
    stack: process.env.NODE_ENV === "production" ? null : err.stack, 
  });
};

module.exports = errorHandler;