require('dotenv').config({path: "../.env"});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const exerciseRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, () => {
    console.log("MongoDB database connection established successfully");
});


app.use(cors());
app.use(express.json());
app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

app.listen(port, () => console.log(`Server started at ${port}`));