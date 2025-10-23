export function errorHandler(err, req, res, next) {
  console.error('🔥 Error:', err);

  let status = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // MongoDB validation
  if (err.name === 'ValidationError') {
    status = 400;
    message = Object.values(err.errors)
      .map(e => e.message)
      .join(', ');
  }

  if (err.name === 'CastError') {
    status = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  }

  // If error came from jsonwebtoken and no explicit code set above

  res.status(status).json({
    success: false,
    error: code || err.code || 'SERVER_ERROR',
    message,
  });
}
