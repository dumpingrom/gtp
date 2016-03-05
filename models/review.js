var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Game = require('./game')

var ReviewSchema = new Schema({
	game: {type: Schema.ObjectId, ref: 'Game'}
	released: Date,
	system: String,
	score: Number
});

module.exports = mongoose.model('Review', GameSchema);