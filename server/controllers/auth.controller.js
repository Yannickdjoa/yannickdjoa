const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/error.js');
const dotenv = require('dotenv');
const { getAuth } = require('firebase-admin/auth');
require('dotenv').config();
require('firebase-functions/logger/compat');

const signIn = async (req, res, next) => {
  const jwtToken = process.env.JWT_SECRET_KEY;
  const auth = getAuth();
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ status: 'failed', message: 'missing credentials' });
  }
  try {
    const userSnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (userSnapshot.empty) {
      return next(errorHandler(404, 'wrong credentials!'));
    }

    const validUser = userSnapshot.docs[0].data();
    //get password and compare
    const passwordMatch = await bcryptjs.compare(password, validUser.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'wrong password' });
    }

    // Set custom claims
    await auth.setCustomUserClaims(validUser.uid, {
      role: validUser.role,
    });
    // Fetch the user record to confirm custom claims are set
    const userRecord = await auth.getUser(validUser.uid);
    console.log(userRecord.customClaims);
    // Generate JWT
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const token = jwt.sign(
      { uid: validUser.uid, email: validUser.email },
      jwtToken,
      {
        expiresIn,
      }
    );
    console.log(token);
    //set session cookie
    res.cookie('access_session', token, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true, // ensure the cookie is only sent over HTTPS
      sameSite: 'None', // ensure the cookie is not sent with cross-site requests
    });

    res.status(200).json({
      status: 'success',
      message: 'Signed in successfully',
      data: validUser,
    });

    // Sign out from Firebase Client SDK if applicable
    // admin.auth().signOut();
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_session');
    res.status(200).json({ status: 'success', message: 'user logged out' });
  } catch (error) {
    next(errorHandler(404, error));
  }
};

module.exports = { signIn, signOut };
