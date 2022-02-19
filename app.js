require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors')
const mongoose = require('mongoose')

require('./middleware/auth')
require('./middleware/cors')

const mongooseURI = process.env.MONGODB
mongoose.connect(mongooseURI)

const indexRouter = require('./routes/index');
const accountRouter = require('./routes/account');
const watchRouter = require('./routes/watch');
const reviewRouter = require('./routes/reviews')
const commentRouter = require('./routes/comments')

const app = express();


// Serve static file
app.use(express.static(path.join(__dirname, 'client/build')));


// ** MIDDLEWARE ** //
// const whitelist = ['http://localhost:3000', 'http://localhost:4000', 'https://tasty-tv-app.herokuapp.com']
// const corsOptions = {
//   origin: function (origin, callback) {
//     console.log("** Origin of request " + origin)
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       console.log("Origin acceptable")
//       callback(null, true)
//     } else {
//       console.log("Origin rejected")
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true
// }

app.use(cors(corsOptions))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.set('trust proxy', 1)

// Handle all routes
app.use('/', indexRouter);
app.use('/account', accountRouter);
app.use('/watch', watchRouter);
app.use('/review', reviewRouter);
app.use('/comment', commentRouter);
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Initialise passport
app.use(passport.initialize)

// catch 404 and forward to error handler
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
