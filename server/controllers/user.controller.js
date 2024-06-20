const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const { getAuth } = require('firebase-admin/auth');

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
  const uid = req.params.id;
  if (!userDetails.exists) {
    return next(errorHandler(404, 'user not found'));
  }

  try {
    getAuth()
      .updateUser(uid, {
        email: req.body.email,
        password: req.body.password,
      })
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log('Successfully updated user', userRecord.toJSON());
      });

    const updatedData = {
      name: req.body.name,
      userName: req.body.userName,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      location: req.body.location,
      github: req.body.github,
      contractType: req.body.contractType,
      category: req.body.category,
      position: req.body.position,
      avatar: req.body.avatar,
    };

    if (req.body.password) {
      const hashPassword = await bcryptjs.hashSync(req.body.password, 10);
      updatedData.password = hashPassword;
    }

    await userId.update(updatedData);
    const updatedUserDetails = await userId.get();

    return res.status(200).send({
      status: 'success',
      message: 'user updated successfully',
      data: updatedUserDetails.data(),
    });
  } catch (error) {
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = db.collection('users').doc(req.params.id);
  const userDetails = await userId.get();
  const uid = req.params.id;

  if (!userDetails.exists) {
    return next(errorHandler(404, 'user not found'));
  }
  try {
    getAuth()
      .deleteUser(uid)
      .then(() => {
        console.log('Successfully deleted user');
      });
    await userId.delete();
    return res
      .status(200)
      .send({ status: 'success', message: 'user deleted successfully' });
  } catch (error) {
    return res.status(500).send({ status: 'failed', message: error });
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
