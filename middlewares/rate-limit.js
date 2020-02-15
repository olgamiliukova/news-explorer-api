const NodeRateLimiter = require('node-rate-limiter');

const { TooManyRequestsError } = require('../errors');

module.exports = (app) => {
  const {
    RATE_LIMIT_LIMIT: rateLimit,
    RATE_LIMIT_EXPIRE: expiration,
  } = app.get('config');

  const nodeRateLimiter = new NodeRateLimiter();

  return (req, res, next) => nodeRateLimiter.get(
    req.clientIp,
    {
      limit: parseInt(rateLimit, 10),
      expire: parseInt(expiration, 10),
    },
    (err, limit) => {
      if (err) {
        return next(err);
      }

      res.set('X-RateLimit-Remaining', limit.remaining);
      res.set('X-RateLimit-Refresh', limit.refresh);

      if (limit.remaining) {
        return next();
      }

      res.set('Retry-After', limit.refresh);

      return next(
        new TooManyRequestsError(
          `Rate limit exceeded, retry in ${limit.refresh} ms`,
        ),
      );
    },
  );
};
