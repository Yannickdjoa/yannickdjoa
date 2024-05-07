const { db } = require('../../firebaseConfig.js');

const { FieldValue } = require('firebase-admin/firestore');
const { errorHandler } = require('../utils/error.js');

const createExperience = async (req, res) => {
  try {
    const experienceId = db.collection('experiences').doc(`${Date.now()}`);
    await experienceId.create({
      image: req.body.image,
      role: req.body.role,
      company: req.body.company,
      date: req.body.date,
      description: req.body.description,
      skills: req.body.skills,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'experience created successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const updateExperience = async (req, res, next) => {
  const experienceId = db.collection('experiences').doc(req.params.id);
  const experienceDetails = await experienceId.get();
  if (!experienceDetails.exists) {
    return next(errorHandler(404, 'experience not found'));
  } else {
    try {
      await experienceId.update({
        image: req.body.image,
        role: req.body.role,
        company: req.body.company,
        date: req.body.date,
        description: req.body.description,
        skills: FieldValue.arrayUnion(...req.body.skills),
      });
      return res.status(200).send({
        status: 'success',
        message: 'experience updated successfully',
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'failed', message: 'update failed' });
    }
  }
};
const deleteExperience = async (req, res, next) => {
  const experienceId = db.collection('experiences').doc(req.params.id);
  const experienceDetails = await experienceId.get();
  if (!experienceDetails.exists) {
    return next(errorHandler(404, 'experience not found'));
  }
  try {
    await experienceId.delete();
    return res
      .status(200)
      .send({ status: 'success', message: 'experience deleted successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error.message });
  }
};
const deleteExperienceField = async (req, res, next) => {
  const experienceId = db.collection('experiences').doc(req.params.id);
  const experienceDetails = await experienceId.get();
  if (!experienceDetails.exists) {
    return next(errorHandler(404, 'experience not found'));
  }
  try {
    await experienceId.update({
      [req.params.field]: FieldValue.delete(),
    });
    return res
      .status(200)
      .send({ status: 'success', message: `field successfully deleted` });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: 'Failed', msg: error });
  }
};

const getSingleExperience = async (req, res, next) => {
  try {
    const experienceId = db.collection('experiences').doc(req.params.id);
    const experienceDetails = await experienceId.get();
    if (!experienceDetails.exists) {
      return next(errorHandler(404, 'experience not found'));
    } else {
      return res.status(200).send({
        status: 'success',
        data: experienceDetails.data(),
      });
    }
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const getAllExperience = async (req, res) => {
  const experienceId = db.collection('experiences');
  const experienceList = await experienceId.get();
  experienceList.forEach((experience) => {
    console.log(experience.data());
    return experience.data();
  });
};

module.exports = {
  createExperience,
  updateExperience,
  deleteExperience,
  deleteExperienceField,
  getSingleExperience,
  getAllExperience,
};
