require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');


console.log("Hello World")

app.use(bodyParser.urlencoded({extended: false}))

app.use('', function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})
app.use('/public', express.static(__dirname + '/public'))

app.get('/', function(req, res) {
    //res.send('Hello Express')
    absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
})
app.get('/json', function(req, res) {
    let greeting = "Hello json"
    if (process.env.MESSAGE_STYLE === "uppercase") {
        greeting = greeting.toUpperCase()
        res.json({"message": greeting})
    } else {
        res.json({"message": greeting})
    }
})
app.get('/now', function(req, res, next) {
    req.time = new Date().toString()
    next();
  }, function(req, res) {
    res.send({time: req.time});
  });

app.get('/:word/echo', function(req, res) {
    res.send({echo: req.params.word});
})

app.route('/name')
    .get(function(req, res) {
        const {first, last} = req.query
        res.json({name: `${first} ${last}`})
    })
    .post(function(req, res) {
        const {first, last} = req.body
        res.json({name: `${first} ${last}`}) 
    })





























 module.exports = app;
