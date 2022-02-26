const mongoose = require('mongoose');

let movieSchema = new mongoose.Schema({
   user: String,
   id: Number,
   name: String,
   poster: String,
   watched: Boolean,
   review: String,
   posted: Boolean,
   user_score: Number,
   overview: String
});

const Movie = mongoose.model('Movie', movieSchema)

module.exports = { Movie }