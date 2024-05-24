const { db } = require('../../firebaseConfig.js');
const { errorHandler } = require('../utils/error.js');

const { FieldValue } = require('firebase-admin/firestore');

const createAboutMe = async (req, res, next) => {
  try {
    const aboutMeId = db.collection('aboutMe').doc(`${Date.now()}`);
    await aboutMeId.create({
      aboutMeId: aboutMeId.id,
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
  deleteAboutMe,
  getAboutMe,
};
