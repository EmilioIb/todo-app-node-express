module.exports = function errorHandler(err, req, res, next) {
  const errors = { message: err.message || err };
  errors.status = false;
  res.status(err.status || 500).json({ errors });
};
