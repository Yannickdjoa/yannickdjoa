const { db } = require('../../firebaseConfig.js');
const firebase = require('firebase/app');
const { firestore } = require('firebase/firestore');
const {
  initializeApp,
  applicationDefault,
  cert,
} = require('firebase-admin/app');
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require('firebase-admin/firestore');

const createBio = async (req, res, next) => {
  try {
    // `/${Date.now()}/`;
    // id: Date.now(),
    const newBio = db.collection('Bio').doc(`/${Date.now()}/`);
    await newBio.set({
      author: req.body.author,
      description: req.body.description,
      address: req.body.address,
      domain: req.body.domain,
      resume: req.body.resume,
      github: req.body.github,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      telegram: req.body.telegram,
      tikTok: req.body.tikTok,
      youtube: req.body.youtube,
    });

    return res.status(200).send({
      status: 'Success',
      msg: `document successfullly created`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Failed', msg: error });
  }
};

const updateBio = async (req, res, next) => {
  try {
    const bioId = db.collection('Bio').doc(req.params.id);
    await bioId.update({
      author: req.body.author,
      description: req.body.description,
      address: req.body.address,
      domain: FieldValue.arrayUnion(...req.body.domain),
      github: req.body.github,
      resume: req.body.resume,
      linkedin: req.body.linkedin,
      twitter: req.body.twitter,
      telegram: req.body.telegram,
      tikTok: req.body.tikTok,
      youtube: req.body.youtube,
    });
    return res
      .status(200)
      .send({ status: 'success', message: `${bioId} successfully updated` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Failed', msg: error });
  }
};
const deleteBio = async (req, res, next) => {
  try {
    const bioId = db.collection('Bio').doc(req.params.id);
    await bioId.delete();
    return res
      .status(200)
      .send({ status: 'success', message: `item successfully deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Failed', msg: error });
  }
};
const deleteBioField = async (req, res, next) => {
  try {
    const bioId = db.collection('Bio').doc(req.params.id);
    // const {
    //   author,
    //   description,
    //   address,
    //   resume,
    //   domain,
    //   github,
    //   linkedin,
    //   twitter,
    //   telegram,
    //   tikTok,
    //   youtube,
    // } = req.body;

    // fund a way ro delete only items in req.body
    await bioId.update({
      [req.params.field]: FieldValue.delete(),
    });
    return res
      .status(200)
      .send({ status: 'success', message: `item successfully deleted` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ status: 'Failed', msg: error });
  }
};
const getBio = async (req, res, next) => {
  try {
    const bioId = db.collection('Bio').doc(req.params.id);
    const bioDetails = await bioId.get();
    if (bioDetails.exists) {
      console.log(bioDetails.data());
      return res
        .status(200)
        .send({ status: 'success', data: bioDetails.data() });
    } else {
      console.log('document doesnt exist');
    }
  } catch (error) {
    return res.status(500).send({ status: 'Failed', msg: error });
  }
};

module.exports = { createBio, updateBio, deleteBio, getBio, deleteBioField };
