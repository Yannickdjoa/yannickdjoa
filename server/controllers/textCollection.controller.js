const { db } = require('../../firebaseConfig.js');

const { FieldValue } = require('firebase-admin/firestore');
const { errorHandler } = require('../utils/error.js');

const createTextCollection = async (req, res) => {
  try {
    const textId = db.collection('textCollection').doc(`${Date.now()}`);
    await textId.create({
      textId: textId.id,
      copyright: req.body.copyright,
      footerSocialTitle: req.body.footerSocialTitle,
      skillsTitle: req.body.skillsTitle,
      skillsSubtitle: req.body.skillsSubtitle,
      aboutTitle: req.body.aboutTitle,
      aboutSubtitle: req.body.aboutSubtitle,
      experienceTitle: req.body.experienceTitle,
      experienceSubtitle: req.body.experienceSubtitle,
      portfolioTitle: req.body.portfolioTitle,
      portfolioSubtitle: req.body.portfolioSubtitle,
      newprojectTitle: req.body.newprojectTitle,
      newprojectButton: req.body.newprojectButton,
      callToActionText: req.body.callToActionText,
      contactTitle: req.body.contactTitle,
      contactSubtitle: req.body.contactSubtitle,
      dashboardTitle: req.body.dashboardTitle,
      dashboardText1: req.body.dashboardText1,
      dashboardText2: req.body.dashboardText2,
      serviceTitle: req.body.serviceTitle,
      serviceSubtitle: req.body.serviceSubtitle,
    });
    return res.status(200).send({
      status: 'success',
      message: 'textCollection created successfully',
    });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const updateTextCollection = async (req, res, next) => {
  const textId = db.collection('textCollection').doc(req.params.id);
  const textDetails = await textId.get();
  if (!textDetails.exists) {
    return next(errorHandler(404, 'text not found'));
  } else {
    try {
      await textId.update({
        copyright: req.body.copyright,
        footerSocialTitle: req.body.footerSocialTitle,
        skillsTitle: req.body.skillsTitle,
        skillsSubtitle: req.body.skillsSubtitle,
        aboutTitle: req.body.aboutTitle,
        aboutSubtitle: req.body.aboutSubtitle,
        experienceTitle: req.body.experienceTitle,
        experienceSubtitle: req.body.experienceSubtitle,
        portfolioTitle: req.body.portfolioTitle,
        portfolioSubtitle: req.body.portfolioSubtitle,
        newprojectTitle: req.body.newprojectTitle,
        newprojectButton: req.body.newprojectButton,
        callToActionText: req.body.callToActionText,
        contactTitle: req.body.contactTitle,
        contactSubtitle: req.body.contactSubtitle,
        dashboardTitle: req.body.dashboardTitle,
        dashboardText1: req.body.dashboardText1,
        dashboardText2: req.body.dashboardText2,
        serviceTitle: req.body.serviceTitle,
        serviceSubtitle: req.body.serviceSubtitle,
      });
      return res.status(200).send({
        status: 'success',
        message: 'textCollection updated successfully',
      });
    } catch (error) {
      return res
        .status(500)
        .send({ status: 'failed', message: 'update failed' });
    }
  }
};
const deleteTextCollection = async (req, res, next) => {
  const textId = db.collection('textCollection').doc(req.params.id);
  const textDetails = await textId.get();
  if (!textDetails.exists) {
    return next(errorHandler(404, 'textCollection not found'));
  }
  try {
    await textId.delete();
    return res
      .status(200)
      .send({ status: 'success', message: 'text deleted successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error.message });
  }
};

const getSingleTextCollection = async (req, res, next) => {
  try {
    const textId = db.collection('textCollection').doc(req.params.id);
    const textDetails = await textId.get();
    if (!textDetails.exists) {
      return next(errorHandler(404, 'text not found'));
    } else {
      return res.status(200).send({
        status: 'success',
        data: textDetails.data(),
      });
    }
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const getAllTextCollection = async (req, res) => {
  try {
    const textId = db.collection('text');
    const textListDetails = await textId.get();
    const textCollectionList = [];
    textListDetails.forEach((text) => {
      textCollectionList.push(text.data());
      return res
        .status(200)
        .send({ status: 'success', data: textCollectionList });
    });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

module.exports = {
  createTextCollection,
  updateTextCollection,
  deleteTextCollection,
  getSingleTextCollection,
  getAllTextCollection,
};
