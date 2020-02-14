const NodeRateLimiter = require('node-rate-limiter');

module.exports = (app) => {
  const nodeRateLimiter = new NodeRateLimiter();
  const {
    RATE_LIMIT_LIMIT: rateLimit,
    RATE_LIMIT_EXPIRATION: expiration,
    RATE_LIMIT_TIMEOUT: timeout,
  } = app.get('config');

  return (req, res, next) => {
    console.log(req.sessionID);
    nodeRateLimiter.get(
      req.sessionID,
      {
        rateLimit,
        expiration,
        timeout,
      },
      (err, limit) => {
        if (err) {
          return next(err);
        }

        res.set('X-RateLimit-Limit', limit.total);
        res.set('X-RateLimit-Remaining', limit.remaining);
        res.set('X-RateLimit-Reset', limit.reset);

        if (limit.remaining) {
          return next();
        }

        res.set('Retry-After', limit.reset);

        return res.send(429, `Rate limit exceeded, retry in ${limit.reset} ms`);
      },
    );
  };
};
