const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const { getAuth } = require('firebase-admin/auth');
const auth = getAuth();

const validatePhoneNumber = (phoneNumber) => {
  const e164Regex = /^\+?[1-9]\d{1,14}$/;
  return e164Regex.test(phoneNumber);
};
const createUsers = async (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).json({
      status: 'failed',
      message: 'Permission denied. Only admins can create users.',
    });
  }
  try {
    const { phoneNumber, email, password, displayName } = req.body;

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        status: 'failed',
        message:
          'The phone number must be contain the country code in format (+1)',
      });
    }

    const userCredential = await auth.createUser({
      displayName,
      email,
      password,
      phoneNumber,
    });
    console.log(userCredential.uid);
    const hashPassword = await bcryptjs.hash(password, 10);

    await db.collection('users').doc(userCredential.uid).set({
      uid: userCredential.uid,
      name: req.body.name,
      displayName,
      phoneNumber,
      email,
      password: hashPassword,
      role: req.body.role,
      location: req.body.location,
      github: req.body.github,
      contractType: req.body.contractType,
      category: req.body.category,
      avatar: req.body.avatar,
      position: req.body.position,
    });

    return res.status(200).json({
      status: 'success',
      message: 'User created successfully',
      user: { uid: userCredential.uid, email },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).json({ status: 'failed', message: error.message });
  }
};

const updateUser = async (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({
      status: 'failed',
      message: 'Permission denied. Only admins can update users.',
    });
  }
  const userId = db.collection('users').doc(req.params.id);
  const userDetails = await userId.get();
  const uid = req.params.id;
  if (!userDetails.exists) {
    return next(errorHandler(404, 'User not found'));
  }

  try {
    const {
      phoneNumber,
      email,
      password,
      displayName,
      name,
      role,
      location,
      github,
      contractType,
      category,
      position,
      avatar,
    } = req.body;

    if (phoneNumber && !validatePhoneNumber(phoneNumber)) {
      return res.status(400).json({
        status: 'failed',
        message:
          'The phone number must be contain the country code in format (+1)',
      });
    }

    await auth.updateUser(uid, {
      email,
      password,
      displayName,
      phoneNumber,
    });

    if (password) {
      const hashPassword = await bcryptjs.hash(password, 10);
      const password = hashPassword;
    }

    await userId.update({
      phoneNumber,
      email,
      password,
      displayName,
      name,
      role,
      location,
      github,
      contractType,
      category,
      position,
      avatar,
    });
    const updatedUserDetails = await userId.get();

    return res.status(200).json({
      status: 'success',
      message: 'User updated successfully',
      data: updatedUserDetails.data(),
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (!req.isAdmin) {
    return res.status(403).json({
      status: 'failed',
      message: 'Permission denied. Only admins can delete users.',
    });
  }
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
  const uid = req.params.id;
  const userId = db.collection('users').doc(uid);
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
  if (!req.isAdmin) {
    return res.status(403).json({
      status: 'failed',
      message: 'Only Admin can see users details',
    });
  }
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
