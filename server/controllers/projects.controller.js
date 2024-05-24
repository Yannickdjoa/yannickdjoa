const { db } = require('../../firebaseConfig.js');
const { errorHandler } = require('../utils/error.js');

const { FieldValue } = require('firebase-admin/firestore');

const createProject = async (req, res, next) => {
  try {
    const projectId = db.collection('projects').doc(`${Date.now()}`);
    await projectId.create({
      projectId: projectId.id,
      title: req.body.title,
      period: req.body.period,
      description: req.body.description,
      projectImg: req.body.projectImg,
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

const updateProject = async (req, res, next) => {
  const projectId = db.collection('projects').doc(req.params.id);
  const projectDoc = await projectId.get();
  if (!projectDoc.exists) {
    return next(errorHandler(401, 'Project not found'));
  } else {
    try {
      await projectId.update({
        title: req.body.title,
        period: req.body.period,
        description: req.body.description,
        projectImg: req.body.projectImg,
        tags: FieldValue.arrayUnion(...req.body.tags),
        category: req.body.category,
        github: req.body.github,
        appLink: req.body.webapp,
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
const deleteProject = async (req, res, next) => {
  const projectId = db.collection('projects').doc(req.params.id);
  const projectDoc = await projectId.get();
  if (!projectDoc.exists) {
    return next(errorHandler(401, 'project not found'));
  }
  try {
    await projectId.delete();
    return res
      .status(500)
      .send({ status: 'success', message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getSingleProject = async (req, res, next) => {
  const projectId = db.collection('projects').doc(req.params.id);
  const projectDoc = await projectId.get();
  if (!projectDoc.exists) {
    return next(errorHandler(401, 'project not found'));
  } else {
    return res.status(200).send({
      status: 'success',
      data: projectDoc.data(),
    });
  }
};

const getAllProjects = async (req, res) => {
  try {
    const projects = db.collection('projects');
    const projectsList = [];
    const projectsDetails = await projects.get();
    projectsDetails.forEach((project) => {
      console.log(project.data());
      projectsList.push(project.data());
    });
    return res.status(200).send({ status: 'success', data: projectsList });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error });
  }
};

module.exports = {
  createProject,
  updateProject,
  deleteProject,
  getSingleProject,
  getAllProjects,
};
