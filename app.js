var express = require('express')
var nunjucks = require('nunjucks')
var MongoClient = require('mongodb').MongoClient
var bodyParser = require('body-parser')

MongoClient.connect('mongodb://localhost:27017/recommend', function (err, db) {
	console.log('Connected to mongodb')
	start_server(db)
})

function start_server(db) {
	var app = express()

	app.use(bodyParser.urlencoded({ extended: true }))

	nunjucks.configure('html', {express: app})

	app.get('/', function (req, res) {
		db.collection('blog').find({}).sort({ _id: -1 }).toArray(function (err, docs) {
			res.render('blog.html', {blog_posts: docs})
		})
	})

	app.get('/about', function (req, res) {
		res.render('about.html')
	})

	app.get('/new/post', function (req, res) {
		res.render('new_post.html')
	})

	app.post('/new/post/save', function (req, res) {
		var post = {
			name: req.body.post_name,
			text: req.body.post_text
		}
		db.collection('blog').insert([ post ], function (err, result) {
			res.redirect('/')
		})
	})

	app.use(express.static('bower_components'))
	app.use(express.static('public'))

	app.listen(3000)
}
