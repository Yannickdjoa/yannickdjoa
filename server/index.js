const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const bioRouter = require('./routes/bio.route.js');
dotenv.config();

//Global variables
const port = process.env.PORT || 5000;

//Main apps

const app = express();
app.use(cors());
app.use(express.json());

//individual routes
app.use('/bio', bioRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
