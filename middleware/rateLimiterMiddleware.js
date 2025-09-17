function createRateLimiter(limiter) {
  return (req, res, next) => {
    const clientId = req.ip;

    if (limiter.allowRequest(clientId)) {
      return next();
    } else {
      return res.status(429).json({
        error: "Too many requests, please slow down!",
      });
    }
  };
}

module.exports = createRateLimiter;
