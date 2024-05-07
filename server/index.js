const express = require('express');
const cors = require('cors');
const bioRouter = require('./routes/bio.route.js');
const projectsRouter = require('./routes/projects.route.js');
const stacksRouter = require('./routes/stacks.route.js');
const dotenv = require('dotenv');
const experiencesRouter = require('./routes/experiences.route.js');
dotenv.config();

//Global variables
const port = process.env.PORT || 5000;

//Main apps

const app = express();
app.use(cors());
app.use(express.json());

//individual routes
app.use('/bio', bioRouter);
app.use('/projects', projectsRouter);
app.use('/stacks', stacksRouter);
app.use("/experiences", experiencesRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
