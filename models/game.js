var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	name: String,
	released: Date,
	system: String,
	score: Number
});