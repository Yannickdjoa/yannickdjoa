const { db } = require('../firebaseConfig.js');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('./error.js');
const dotenv = require('dotenv');
const { getAuth } = require('firebase-admin/auth');
require('dotenv').config();

const jwtToken = process.env.JWT_SECRET_KEY;

const verifyUser = (req, res, next) => {
  const auth = getAuth();
  const token = req.cookies.access_session;

  if (!token) {
    return next(errorHandler(401, 'Authentication required'));
  }

  jwt.verify(token, jwtToken, async (err, decodedUser) => {
    if (err) {
      return next(errorHandler(401, 'Invalid or expired token'));
    }

    try {
      const userRecord = await auth.getUser(decodedUser.uid);
      const userClaims = userRecord.customClaims;

      if (!userClaims || !userClaims.role) {
        return next(errorHandler(401, 'Permission denied'));
      }
      req.user = {
        uid: decodedUser.uid,
        email: decodedUser.email,
        role: userClaims.role,
      }; // Attach decoded user information to the request

      req.isAdmin = userClaims.role === 'admin'; // Set isAdmin based on user role

      next();
    } catch (error) {
      console.error('Error fetching user claims:', error);
      return next(errorHandler(500, 'Internal server error'));
    }
  });
};
module.exports = { verifyUser };
