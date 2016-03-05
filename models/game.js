var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
	name: 		{type: String, required: true},
	released: 	{type: Date, required: true},
	system: 	{type: Schema.ObjectId, ref: 'System', required: true},
	score:  	{type: Number, min: 0, max: 20}
});

module.exports = mongoose.model('Game', GameSchema);