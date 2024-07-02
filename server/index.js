const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const functions = require('firebase-functions');
const bioRouter = require('./routes/bio.route.js');
const projectsRouter = require('./routes/projects.route.js');
const stacksRouter = require('./routes/stacks.route.js');
const experiencesRouter = require('./routes/experiences.route.js');
const servicesRouter = require('./routes/services.route.js');
const textCollectionRouter = require('./routes/textCollection.route.js');
const webIntroRouter = require('./routes/webIntro.route.js');
const aboutMeRouter = require('./routes/about.route.js');
const userRouter = require('./routes/user.route.js');
const authRouter = require('./routes/auth.route.js');
const dotenv = require('dotenv');
dotenv.config();

//Global variables
const port = process.env.OUT_PORT || 8080;

//Main apps
// exposedHeaders: ['set-cookie'];
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

//individual routes
app.use('/api/bio', bioRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/stacks', stacksRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/textCollection', textCollectionRouter);
app.use('/api/webIntro', webIntroRouter);
app.use('/api/aboutMe', aboutMeRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

exports.backend = functions.https.onRequest(app);
