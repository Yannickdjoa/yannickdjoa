const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error.js');
const dotenv = require('dotenv');
require('dotenv').config();

const jwtToken = process.env.JWT_SECRET_KEY;

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_session;

  if (!token) {
    return next(errorHandler(401, 'Authentication required'));
  }

  jwt.verify(token, jwtToken, (err, decodedUser) => {
    if (err) {
      return next(errorHandler(401, 'Invalid or expired token'));
    }

    req.user = decodedUser; // Attach decoded user information to the request
    next();
  });
};
module.exports = { verifyUser };
