const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const { getAuth } = require('firebase-admin/auth');
const auth = getAuth();

// const createUsers = async (req, res) => {
//   // {
//   //   // uid,
//   //   name,
//   //   userName,
//   //   phoneNumber,
//   //   email,
//   //   password,
//   //   role,
//   //   location,
//   //   github,
//   //   contractType,
//   //   category,
//   //   avatar,
//   //   position,
//   // } = req.body;
//   // console.log(req.body);
//   try {
//     // const userCredential = await createUser(
//     //   auth,
//     //   email,
//     //   password
//     // );
//     // const { user } = userCredential;
//     // const { uid } = user;
//     // const hashPassword = await bcryptjs.hashSync(password, 10);
//     const userCredential = auth.createUser({
//       name: req.body.name,
//       userName: req.body.userName,
//       phoneNumber: req.body.phoneNumber,
//       email: req.body.email,
//       password: req.body.password,
//       role: req.body.role,
//       location: req.body.location,
//       github: req.body.github,
//       avatar: req.body.avatar,
//       contractType: req.body.contractType,
//       category: req.body.category,
//       position: req.body.position,
//     });
//     const newUser = await userCredential.get();
//     console.log(newUser);
//     // const { uid } = userCredential;
//     // const userId = db.collection('users').doc(uid);
//     // await userId.create({
//     //   uid,
//     //   name,
//     //   userName,
//     //   phoneNumber,
//     //   email,
//     //   password: hashPassword,
//     //   role,
//     //   location,
//     //   github,
//     //   avatar,
//     //   contractType,
//     //   category,
//     //   position,
//     // });
//     return res.status(200).send({
//       status: 'success',
//       message: 'user created successfully',
//       user: userCredential.user,
//     });
//   } catch (error) {
//     return res.status(500).send({ status: 'failed', message: error });
//   }
// };
const validatePhoneNumber = (phoneNumber) => {
  const e164Regex = /^\+?[1-9]\d{1,14}$/;
  return e164Regex.test(phoneNumber);
};
const createUsers = async (req, res) => {
  console.log(req.body);
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
      let password = hashPassword;
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
