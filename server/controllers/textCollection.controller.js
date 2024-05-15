const { db } = require('../../firebaseConfig.js');

const { FieldValue } = require('firebase-admin/firestore');
const { errorHandler } = require('../utils/error.js');

const createTextCollection = async (req, res) => {
  try {
    const textId = db.collection('textCollection').doc(`${Date.now()}`);
    await textId.create({
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
const deleteTextCollectionField = async (req, res, next) => {
  const textId = db.collection('textCollection').doc(req.params.id);
  const textDetails = await textId.get();
  if (!textDetails.exists) {
    return next(errorHandler(404, 'text not found'));
  }
  try {
    await textId.update({
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
  const textId = db.collection('text');
  const textList = await textId.get();
  textList.forEach((text) => {
    console.log(text.data());
    return text.data();
  });
};

module.exports = {
  createTextCollection,
  updateTextCollection,
  deleteTextCollection,
  deleteTextCollectionField,
  getSingleTextCollection,
  getAllTextCollection,
};
