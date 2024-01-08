require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { SERVER_PORT, MONGOODB_URL } = process.env;

const app = express();
app.use(cors({ origin: true }));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  '/api/v1',
  require('./routes')
);

const startServer = async () => {
  try {
    await mongoose.connect(MONGOODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(">>> Connected to MongoDB");

    app.listen(SERVER_PORT || 5000, () => {
      console.log(`>>> Listening on port ${SERVER_PORT || 5000}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

startServer();
