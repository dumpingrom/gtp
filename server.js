// server.js 

/////////// BASE SETUP
// call packages
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// configure app to use body parser (POST)
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// set port
var port = process.env.PORT || 8080;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gtp');

// models
var Game = require('./models/game');

//////////// ROUTES
var router = express.Router();

// middleware
router.use(function(req, res, next){
	// logging
	console.log('request');
	next();
});
// routes
// /api
router.get('/', function(req, res){
	res.json({
		message: "This is the default route for ReST API"
	});
});

// /games
router.route('/games')
	// add game
	.post(function(req, res){
		var game = new Game();
		game.name = req.body.name;
		game.released = req.body.released;
		game.system = req.body.system;
		//save to db
		game.save(function(err){
			if (err) res.send(err);

			res.json({message: 'Game created'});
		});
	})
	.get(function(req, res){
		Game.find(function(err, games){
			if (err) res.send(err);

			res.json(games);
		});
	});

// /games/:gameId
router.route('/games/:gameId')
	// find game
	.get(function(req, res){
		Game.findById(req.params.gameId, function(err, game){
			if(err) res.send(err);
			res.json(game);
		});
	})
	.put(function(req, res){
		Game.findById(req.params.gameId, function(err, game){
			if(err) res.send(err);
			
			game.name = req.body.name;
			game.save(function(err){
				if (err) res.send(err);

				res.json({message: 'Game updated'});
			});
		});
	})
	.delete(function(req, res){
		Game.remove({
			_id: req.params.gameId
		}, function(err, game){
			if (err) res.send(err);

			res.json({message: "Successfully deleted"});
		});
	});

// prefix routes with /api
app.use('/api', router);

/////////// START SERVER
app.listen(port);
console.log("API launched on port "+port);