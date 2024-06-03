const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const bioRouter = require('./server/routes/bio.route.js');
const projectsRouter = require('./server/routes/projects.route.js');
const stacksRouter = require('./server/routes/stacks.route.js');
const dotenv = require('dotenv');
const experiencesRouter = require('./server/routes/experiences.route.js');
const servicesRouter = require('./server/routes/services.route.js');
const textCollectionRouter = require('./server/routes/textCollection.route.js');
const webIntroRouter = require('./server/routes/webIntro.route.js');
const aboutMeRouter = require('./server/routes/about.route.js');
dotenv.config();

//Global variables
const port = process.env.OUT_PORT || 8080;

//Main apps

const app = express();
app.use(cors());
app.use(express.json());

//individual routes
app.use('/api/bio', bioRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/stacks', stacksRouter);
app.use('/api/experiences', experiencesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/textCollection', textCollectionRouter);
app.use('/api/webIntro', webIntroRouter);
app.use('/api/aboutMe', aboutMeRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

exports.api = functions.https.onRequest(app);
