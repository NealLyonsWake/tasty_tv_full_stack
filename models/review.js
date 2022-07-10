const mongoose = require('mongoose');

let reviewSchema = new mongoose.Schema({
   author: String,
   id: Number,
   name: String,
   poster: String,
   watched: Boolean,
   review: String,
   posted: Boolean,
   comment: String,
   user_score: Number,
   overview: String
});

const Review = mongoose.model('Review', reviewSchema)

module.exports = { Review }