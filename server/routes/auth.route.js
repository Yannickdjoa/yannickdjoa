const express = require('express');
const { signIn, signOut } = require('../controllers/auth.controller.js');
const { verifyUser } = require('../utils/verifyUser.js');

const authRouter = express.Router();

authRouter.post('/signin', signIn);
authRouter.post('/signout', signOut);

module.exports = authRouter;
