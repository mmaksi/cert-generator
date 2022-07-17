const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  return res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ error: err.message });
};

module.exports = {
  notFound,
  errorHandler,
};
