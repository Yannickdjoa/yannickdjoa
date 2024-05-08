const { db } = require('../../firebaseConfig.js');

const { FieldValue } = require('firebase-admin/firestore');
const { errorHandler } = require('../utils/error.js');

const createNavigation = async (req, res) => {
  try {
    const navigationId = db.collection('navigation').doc(`${Date.now()}`);
    await navigationId.create({
      name: req.body.name,
      href: req.body.href,
      icon: req.body.icon,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'navigation created successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const updateNavigation = async (req, res, next) => {
  const navigationId = db.collection('navigation').doc(req.params.id);
  const navigationDetails = await navigationId.get();
  if (!navigationDetails.exists) {
    return next(errorHandler(404, 'navigation not found'));
  } else {
    try {
      await navigationId.update({
        name: req.body.name,
        href: req.body.href,
        icon: req.body.icon,
      });
      return res.status(200).send({
        status: 'success',
        message: 'navigation updated successfully',
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'failed', message: 'update failed' });
    }
  }
};
const deleteNavigation = async (req, res, next) => {
  const navigationId = db.collection('navigation').doc(req.params.id);
  const navigationDetails = await navigationId.get();
  if (!navigationDetails.exists) {
    return next(errorHandler(404, 'navigation not found'));
  }
  try {
    await navigationId.delete();
    return res
      .status(200)
      .send({ status: 'success', message: 'navigation deleted successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error.message });
  }
};
const deleteNavigationField = async (req, res, next) => {
  const navigationId = db.collection('navigation').doc(req.params.id);
  const navigationDetails = await navigationId.get();
  if (!navigationDetails.exists) {
    return next(errorHandler(404, 'Navigation not found'));
  }
  try {
    await navigationId.update({
      href: FieldValue.delete(),
      name: FieldValue.delete(),
      icon: FieldValue.delete(),
    });
    return res
      .status(200)
      .send({ status: 'success', message: `field successfully deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
};

const getSingleNavigation = async (req, res, next) => {
  try {
    const navigationId = db.collection('navigation').doc(req.params.id);
    const navigationDetails = await navigationId.get();
    if (!navigationDetails.exists) {
      return next(errorHandler(404, 'navigation not found'));
    } else {
      return res.status(200).send({
        status: 'success',
        data: navigationDetails.data(),
      });
    }
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const getAllNavigation = async (req, res) => {
  const navigationId = db.collection('navigation');
  const navigationList = await navigationId.get();
  navigationList.forEach((navigation) => {
    console.log(navigation.data());
    return navigation.data();
  });
};

module.exports = {
  createNavigation,
  updateNavigation,
  deleteNavigation,
  deleteNavigationField,
  getSingleNavigation,
  getAllNavigation,
};
