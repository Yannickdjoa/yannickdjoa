const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { errorHandler } = require('../utils/error.js');
const dotenv = require('dotenv');
require('dotenv').config();

const signIn = async (req, res, next) => {
  const jwtToken = process.env.JWT_SECRET_KEY;
  const { email, password } = req.body;
  try {
    const userSnapshot = await db
      .collection('users')
      .where('email', '==', email)
      .get();

    if (userSnapshot.empty)
      return next(errorHandler(404, 'wrong credentials!'));
    const validUser = userSnapshot.docs[0].data();

    //get password and compare
    const passwordMatch = await bcryptjs.compare(password, validUser.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ status: 'failed', message: 'wrong password' });
    }

    // Generate JWT
    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const token = jwt.sign(
      { uid: validUser.uid, email: validUser.email },
      jwtToken,
      {
        expiresIn,
      }
    );
    console.log('JWT created:', token);
    //set session cookie
    res.cookie('access_session', token, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    });

    // Sign out from Firebase Client SDK if applicable
    // admin.auth().signOut();

    res.status(200).json({
      status: 'success',
      message: 'Signed in successfully',
      data: validUser,
    });
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
