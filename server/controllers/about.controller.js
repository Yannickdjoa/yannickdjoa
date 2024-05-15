const { db } = require('../../firebaseConfig.js');
const { errorHandler } = require('../utils/error.js');

const { FieldValue } = require('firebase-admin/firestore');

const createAboutMe = async (req, res, next) => {
  try {
    const aboutMeId = db.collection('aboutMe').doc(`${Date.now()}`);
    await aboutMeId.create({
      aboutCaption: req.body.aboutCaption,
      aboutsubtitle1: req.body.aboutsubtitle1,
      aboutsubtitle2: req.body.aboutsubtitle2,
      aboutsubtitle3: req.body.aboutsubtitle3,
      aboutsubtitle4: req.body.aboutsubtitle4,
      aboutText: req.body.aboutText,
      profileImg: req.body.profileImg,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'aboutMe successfully created' });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      message: 'could not create the aboutMe',
      error: error,
    });
  }
};

const updateAboutMe = async (req, res, next) => {
  const aboutMeId = db.collection('aboutMe').doc(req.params.id);
  const aboutMeDoc = await aboutMeId.get();
  if (!aboutMeDoc.exists) {
    return next(errorHandler(401, 'aboutMe not found'));
  } else {
    try {
      await aboutMeId.update({
        aboutCaption: req.body.aboutCaption,
        aboutsubtitle1: req.body.aboutsubtitle1,
        aboutsubtitle2: req.body.aboutsubtitle2,
        aboutsubtitle3: req.body.aboutsubtitle3,
        aboutsubtitle4: req.body.aboutsubtitle4,
        aboutText: req.body.aboutText,
        profileImg: req.body.profileImg,
      });
      return res.status(200).send({
        status: 'success',
        message: 'updated successfully',
      });
    } catch (error) {
      next(error);
    }
  }
};
const deleteAboutMe = async (req, res, next) => {
  const aboutMeId = db.collection('aboutMe').doc(req.params.id);
  const aboutMeDoc = await aboutMeId.get();
  if (!aboutMeDoc.exists) {
    return next(errorHandler(401, 'aboutMe not found'));
  }
  try {
    await aboutMeId.delete();
    return res
      .status(500)
      .send({ status: 'success', message: 'aboutMe deleted successfully' });
  } catch (error) {
    next(error);
  }
};
const deleteAboutMeField = async (req, res, next) => {
  const aboutMeId = db.collection('aboutMe').doc(req.params.id);
  const aboutMeDoc = await aboutMeId.get();
  if (!aboutMeDoc.exists) {
    return next(errorHandler(401, 'aboutMe not found'));
  }
  console.log(req.params);
  try {
    await aboutMeId.update({
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
const getAboutMe = async (req, res, next) => {
  const aboutMeId = db.collection('aboutMe').doc(req.params.id);
  const aboutMeDoc = await aboutMeId.get();
  if (!aboutMeDoc.exists) {
    return next(errorHandler(401, 'aboutMe not found'));
  } else {
    return res.status(200).send({
      status: 'success',
      data: aboutMeDoc.data(),
    });
  }
};

module.exports = {
  createAboutMe,
  updateAboutMe,
  deleteAboutMeField,
  getAboutMe,
};
