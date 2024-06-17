const express = require('express');
const { createUsers } = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send('Hello from user route');
});
userRouter.post('/create', createUsers);

module.exports = userRouter;
