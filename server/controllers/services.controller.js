const { db } = require('../../firebaseConfig.js');

const { FieldValue } = require('firebase-admin/firestore');
const { errorHandler } = require('../utils/error.js');

const createServices = async (req, res) => {
  try {
    const serviceId = db.collection('services').doc(`${Date.now()}`);
    await serviceId.create({
      serviceId: serviceId.id,
      category: req.body.category,
      serviceName: req.body.serviceName,
      description: req.body.description,
      price: req.body.price,
      timeFrame: req.body.timeFrame,
      serviceImage: req.body.serviceImage,
      stacksUsed: req.body.stacksUsed,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'services created successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const updateServices = async (req, res, next) => {
  const serviceId = db.collection('services').doc(req.params.id);
  const serviceDetails = await serviceId.get();
  if (!serviceDetails.exists) {
    return next(errorHandler(404, 'services not found'));
  } else {
    try {
      await serviceId.update({
        category: req.body.category,
        serviceName: req.body.serviceName,
        description: req.body.description,
        price: req.body.price,
        timeFrame: req.body.timeFrame,
        serviceImage: req.body.serviceImage,
        stacksUsed: req.body.stacksUsed,
      });
      return res.status(200).send({
        status: 'success',
        message: 'services updated successfully',
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'failed', message: 'update failed' });
    }
  }
};
const deleteServices = async (req, res, next) => {
  const serviceId = db.collection('services').doc(req.params.id);
  const serviceDetails = await serviceId.get();
  if (!serviceDetails.exists) {
    return next(errorHandler(404, 'services not found'));
  }
  try {
    await serviceId.delete();
    return res
      .status(200)
      .send({ status: 'success', message: 'services deleted successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error.message });
  }
};

const getSingleServices = async (req, res, next) => {
  try {
    const serviceId = db.collection('services').doc(req.params.id);
    const serviceDetails = await serviceId.get();
    if (!serviceDetails.exists) {
      return next(errorHandler(404, 'services not found'));
    } else {
      return res.status(200).send({
        status: 'success',
        data: serviceDetails.data(),
      });
    }
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const getAllServices = async (req, res) => {
  try {
    const serviceId = db.collection('services');
    const servicesList = [];
    const servicesDetails = await serviceId.get();
    servicesDetails.forEach((service) => {
      servicesList.push(service.data());
    });
    return res.status(200).send({ status: 'success', data: servicesList });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error });
  }
};

module.exports = {
  createServices,
  updateServices,
  deleteServices,
  getSingleServices,
  getAllServices,
};
