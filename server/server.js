require('dotenv').config({path: "./config.env"});
const express = require("express");
const connectDB = require("./config/db");

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());

const server = app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);