const { db } = require('../firebaseConfig.js');
const bcryptjs = require('bcryptjs');
const { errorHandler } = require('../utils/error.js');
const {
  getAuth,
  createUserWithEmailAndPassword,
} = require('firebase-admin/auth');
const auth = getAuth();

// export const createUser = async (req, res, next) => {
//   const { username, email, password } = req.body;
//   const hashedPassword = await bcryptjs.hashSync(password, 10);
//   const newUser = new User({ username, email, password: hashedPassword });
//   try {
//     await newUser.save();
//     res.status(201).json('user created successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const signIn = async (req, res, next) => {

// }
// const { idToken } = req.body;
// try {
//   // Verify the ID token
//   const decodedToken = await admin.auth().verifyIdToken(idToken);
//   const uid = decodedToken.uid;
//   // Retrieve the user record
//   const userRecord = await admin.auth().getUser(uid);
//   // Generate a JWT token (optional, for your own session management)
//   const token = jwt.sign({ uid: userRecord.uid }, jwtSecret);
//   // Set the JWT token as a cookie
//   res.cookie('access_token', token, { httpOnly: true, secure: true });
//   // Respond with the user data
//   const { password, ...rest } = userRecord;
//   res.status(200).json(rest);
// } catch (error) {
//   console.error(error);
//   next(error);
// }
// };
// const { email, password } = req.body;
// try {
//   const validUser = await db.collection('users').doc;
//   if (!validUser) return next(errorHandler(404, 'wrong credentials!'));
//   const validPassword = await bcryptjs.compareSync(
//     password,
//     validUser.password
//   );
//   if (!validPassword) return next(errorHandler(404, 'wrong credentials!'));
//   const token = jwt.sign({ id: validUser._id }, jwtToken);
//   const { password: pass, ...rest } = validUser._doc;
//   res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
// } catch (error) {
//   next(error);

// export const signOut = async (req, res, next) => {
//   try {
//     res.clearCookie('access_token');
//     res.status(200).json('user logged out');
//   } catch (error) {
//     next(errorHandler(error));
//   }
// };
