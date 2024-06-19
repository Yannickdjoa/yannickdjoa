const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');

const createUsers = async (req, res) => {
  try {
    const {
      uid,
      name,
      userName,
      phoneNumber,
      email,
      password,
      role,
      location,
      github,
      contractType,
      category,
      avatar,
      position,
    } = req.body;
    const hashPassword = await bcryptjs.hashSync(password, 10);
    const userId = db.collection('users').doc(uid);
    await userId.create({
      userId: userId.id,
      uid,
      name,
      userName,
      phoneNumber,
      email,
      password: hashPassword,
      role,
      location,
      github,
      avatar,
      contractType,
      category,
      position,
    });
    return res.status(200).send({
      status: 'success',
      message: 'user created successfully',
    });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

const updateUser = async (req, res, next) => {
  const userId = db.collection('users').doc(req.params.id);
  const userDetails = await userId.get();
  if (!userDetails.exists) {
    return next(errorHandler(404, 'user not found'));
  } else {
    try {
      if (req.body.password) {
        const hashPassword = await bcryptjs.hashSync(req.body.password, 10);
        await userId.update({
          name: req.body.name,
          userName: req.body.userName,
          phone: req.body.phone,
          email: req.body.email,
          password: hashPassword,
          role: req.body.role,
          location: req.body.location,
          github: req.body.github,
          contractType: req.body.contractType,
          category: req.body.category,
          position: req.body.position,
          avatar: req.body.avatar,
        });
        return res.status(200).send({
          status: 'success',
          message: 'user updated successfully',
        });
      }
    } catch (error) {
      return next(error);
    }
  }
};

const deleteUser = async (req, res, next) => {
  const userId = db.collection('users').doc(req.params.id);
  const userDetails = await userId.get();
  if (!userDetails.exists) {
    return next(errorHandler(404, 'user not found'));
  } else {
    try {
      await userId.delete();
      return res
        .status(200)
        .send({ status: 'success', message: 'user deleted successfully' });
    } catch (error) {
      return res.status(500).send({ status: 'failed', message: error });
    }
  }
};

const getUser = async (req, res, next) => {
  const userId = db.collection('users').doc(req.params.id);
  const userDetails = await userId.get();
  if (!userDetails.exists) {
    return next(errorHandler(404, 'user not found'));
  } else {
    try {
      const { password: pass, ...rest } = userDetails.data();
      return res.status(200).send({ status: 'success', data: rest });
    } catch (error) {
      return next(error);
    }
  }
};

const getAllUsers = async (req, res) => {
  try {
    const userList = [];
    const userId = db.collection('users');
    const userDetails = await userId.get();
    userDetails.forEach((user) => {
      const { password: pass, ...rest } = user.data();
      userList.push(rest);
    });

    return res.status(200).send({ status: 'success', data: userList });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
  }
};

module.exports = { createUsers, updateUser, deleteUser, getUser, getAllUsers };
