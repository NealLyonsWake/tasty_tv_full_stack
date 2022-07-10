require('dotenv').config();
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');

// Configure authentication middleware
require('./middleware/auth'); 

// Setup MongoDB
const mongooseURI = process.env.MONGODB;
mongoose.connect(mongooseURI);

// Configure required application routes
const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const watchRouter = require('./routes/watch');
const reviewRouter = require('./routes/reviews');
const commentRouter = require('./routes/comments');

// Unpack express function into app
const app = express();

// Serve static initial file
app.use(express.static(path.join(__dirname, 'client/build')));

/*
Configure Cors origin middleware below.
Partly set up to account for a work around to be able to exchange cookies between the back-end and the client.
This is due to Heroku being on the Public Suffix List and therefore different origins
of *.herokuapp.com will not be able to exchange cookies.
*/
const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'https://tasty-tv-app.herokuapp.com'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Origin of request" + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};
app.use(cors(corsOptions));

// Configure other
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1);

// Configure all routes
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/watch', watchRouter);
app.use('/review', reviewRouter);
app.use('/comment', commentRouter);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Initialise passport
app.use(passport.initialize);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {  
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;