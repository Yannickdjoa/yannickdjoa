const express = require('express');
const { verifyUser } = require('../utils/verifyUser');
const {
  createUsers,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/create', verifyUser, createUsers);
userRouter.put('/update/:id', verifyUser, updateUser);
userRouter.delete('/delete/:id', verifyUser, deleteUser);
userRouter.get('/get/:id', getUser);
userRouter.get('/getAll', verifyUser, getAllUsers);

module.exports = userRouter;
