const { db } = require('../../firebaseConfig.js');

const { FieldValue } = require('firebase-admin/firestore');

const createProject = async (req, res, next) => {
  try {
    const projectId = db.collection('projects').doc(`${Date.now()}`);
    await projectId.create({
      title: req.body.title,
      period: req.body.period,
      description: req.body.description,
      image: req.body.image,
      tags: req.body.tags,
      category: req.body.category,
      github: req.body.github,
      appLink: req.body.webapp,
    });
    return res
      .status(200)
      .send({ status: 'success', message: 'project successfully created' });
  } catch (error) {
    res.status(500).send({
      status: 'failed',
      message: 'could not create the project',
      error: error,
    });
  }
};

const updateProject = async (req, res, next) => {};

module.exports = { createProject };
