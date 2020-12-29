//Set up MongoDB Atlas variables
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

//Connect to express port
const app = express();
const port = process.env.PORT || 5000;

//Set up middleware
app.use(cors());
app.use(express.json());

//Get URI from MongoDB dashboard
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});