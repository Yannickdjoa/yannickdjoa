const express = require('express');
const {
  createUsers,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} = require('../controllers/user.controller');

const userRouter = express.Router();

userRouter.post('/create', createUsers);
userRouter.put('/update/:id', updateUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.get('/get/:id', getUser);
userRouter.get('/getAll', getAllUsers);

module.exports = userRouter;
