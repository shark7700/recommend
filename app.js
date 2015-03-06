var express = require('express')
var nunjucks = require('nunjucks')

var app = express()

nunjucks.configure('html', {express: app})

app.get('/', function (req, res) {
	res.render('index.html')
})

app.get('/hello/:name', function (req, res) {
	res.send('prevet, ' + req.params.name)
})

app.listen(3000)