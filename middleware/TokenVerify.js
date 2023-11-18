// tokenMiddleware.js
const jwt = require('jsonwebtoken');

const secretKey = '123';

const tokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token)

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token verification failed' });
    }

    // Attach the decoded payload to the request for future middleware or route handlers
    req.body.authUser = decoded;
    next();
  });
};

module.exports = tokenMiddleware;
