const { db } = require('../../firebaseConfig.js');
const { errorHandler } = require('../utils/error.js');

const { FieldValue } = require('firebase-admin/firestore');

const createWebIntro = async (req, res, next) => {
  try {
    const webIntroId = db.collection('webIntro').doc(`${Date.now()}`);
    await webIntroId.create({
      mainCaption: req.body.mainCaption,
      secondaryCaption: req.body.secondaryCaption,
      captionImg: req.body.captionImg,
      coloredCaption: req.body.coloredCaption,
      introText: req.body.introText,
      buttonImg: req.body.buttonImg,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'webIntro successfully created' });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      message: 'could not create the webIntro',
      error: error,
    });
  }
};

const updateWebIntro = async (req, res, next) => {
  const webintroId = db.collection('webIntro').doc(req.params.id);
  const webintroDoc = await webintroId.get();
  if (!webintroDoc.exists) {
    return next(errorHandler(401, 'Webintro not found'));
  } else {
    try {
      await webintroId.update({
        MainCaption: req.body.mainCaption,
        secondaryCaption: req.body.secondaryCaption,
        captionImg: req.body.captionImg,
        coloredCaption: req.body.coloredCaption,
        introText: req.body.introText,
        buttonImg: req.body.buttonImg,
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
const deleteWebIntro = async (req, res, next) => {
  const webIntroId = db.collection('webIntro').doc(req.params.id);
  const webIntroDoc = await webIntroId.get();
  if (!webIntroDoc.exists) {
    return next(errorHandler(401, 'webIntro not found'));
  }
  try {
    await webIntroId.delete();
    return res
      .status(500)
      .send({ status: 'success', message: 'webIntro deleted successfully' });
  } catch (error) {
    next(error);
  }
};
const deleteWebIntroField = async (req, res, next) => {
  const webIntroId = db.collection('webIntro').doc(req.params.id);
  const webIntroDoc = await webIntroId.get();
  if (!webIntroDoc.exists) {
    return next(errorHandler(401, 'WebIntro not found'));
  }
  console.log(req.params);
  try {
    await webIntroId.update({
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
const getWebIntro = async (req, res, next) => {
  const webIntroId = db.collection('webIntro').doc(req.params.id);
  const webIntroDoc = await webIntroId.get();
  if (!webIntroDoc.exists) {
    return next(errorHandler(401, 'webIntro not found'));
  } else {
    return res.status(200).send({
      status: 'success',
      data: webIntroDoc.data(),
    });
  }
};

module.exports = {
  createWebIntro,
  updateWebIntro,
  deleteWebIntroField,
  getWebIntro,
};
