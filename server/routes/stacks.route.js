const express = require('express');
const {
  createStack,
  updateStack,
  deleteStack,
  getSingleStack,
  getAllStacks,
} = require('../controllers/stacks.controller');

const stacksRouter = express.Router();

stacksRouter.post('/create', createStack);
stacksRouter.put('/update/:id', updateStack);
stacksRouter.delete('/delete/:id', deleteStack);
stacksRouter.get('/getSingleStack/:id', getSingleStack);
stacksRouter.get('/getAll', getAllStacks);

module.exports = stacksRouter;
