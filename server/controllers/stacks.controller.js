const { db } = require('../../firebaseConfig.js');
const { FieldValue } = require('firebase-admin/firestore');
const { errorHandler } = require('../utils/error.js');

const createStack = async (req, res) => {
  try {
    const stackId = db.collection('stacks').doc(`${Date.now()}`);
    await stackId.create({
      id: Date.now(),
      category: req.body.category,
      stackName: req.body.stackName,
      stackImage: req.body.stackImage,
      stackPercentage: req.body.stackPercentage,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'stack successfully created' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};
const updateStack = async (req, res, next) => {
  const stackId = db.collection('stacks').doc({ id: req.params.id });
  const stackDetails = await stackId.get();
  if (!stackDetails.exists) {
    return next(errorHandler(404, 'stack not found'));
  } else {
    try {
      await stackId.update({
        category: req.body.category,
        stackName: req.body.stackName,
        stackImage: req.body.stackImage,
        stackPercentage: req.body.stackPercentage,
      });
      return res
        .status(200)
        .send({ status: 'success', message: 'stack successfully updated' });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'error', message: 'error occurred while updating' });
    }
  }
};
const deleteStack = async (req, res, next) => {
  const stackId = db.collection('stacks').doc(req.params.id);
  const stackDetails = await stackId.get();
  if (!stackDetails.exists) {
    return next(errorHandler(404, 'stack not found'));
  } else {
    try {
      await stackId.delete();
      return res
        .status(200)
        .send({ status: 'success', message: 'stack successfully deleted' });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'error', message: 'error occurred while deleting' });
    }
  }
};
const deleteStackField = async (req, res, next) => {
  const stackId = db.collection('stacks').doc(req.params.id);
  const stackDetails = await stackId.get();
  if (!stackDetails.exists) {
    return next(errorHandler(404, 'stack not found'));
  }
  try {
    const { category, stackName, stackImage } = req.params;
    await stackId.update({
      category: FieldValue.delete(),
      stackName: FieldValue.delete(),
      stackImage: FieldValue.delete(),
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'stack field deleted successfully' });
  } catch (error) {
    return res
      .status(500)
      .send({ status: 'error', message: 'error occurred while deleting' });
  }
};
const getSingleStack = async (req, res, next) => {
  const stackId = db.collection('stacks').doc(req.params.id);
  const stackDetails = await stackId.get();
  if (!stackDetails.exists) {
    return next(errorHandler(404, 'stack not found'));
  } else {
    try {
      return res
        .status(200)
        .send({ status: 'success', data: stackDetails.data() });
    } catch (error) {
      return error.message();
    }
  }
};
const getAllStacks = async (req, res, next) => {
  try {
    const stacksId = db.collection('stacks');
    const stackDetails = await stacksId.get();
    const stacksList = [];
    stackDetails.forEach((stack) => {
      stacksList.push(stack.data());
      console.log(stacksList);
    });
    return res.status(200).send({ status: 'success', data: stacksList });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'failed', message: error });
  }
};
module.exports = {
  createStack,
  updateStack,
  deleteStack,
  deleteStackField,
  getAllStacks,
  getSingleStack,
};
