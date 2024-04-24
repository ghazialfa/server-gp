if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const connectToMongoDB = require('./db/connectToMongoDB');
const ErrorHandler = require('./middleware/ErrorHandler');
const { app, server } = require('./socket/socket');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(ErrorHandler);
server.listen(port, () => {
  connectToMongoDB();
  console.log(`Example app listening on port ${port}!`);
});
