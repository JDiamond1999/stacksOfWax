//node modules
const express = require("express");
let app = express();
const path = require("path");
const bodyParser = require('body-parser');

//middleware
app.use(express.static(path.join(__dirname, './css')));
app.use(express.static(path.join(__dirname, './images')));
app.use(bodyParser.urlencoded({extend: true}));

app.set('view engine', 'ejs');

//routes
app.get("/", function (req, res) {
    res.render('index');
});

app.get("/signin", function (req, res) {
    res.render('signin');
});

app.get("/register", function (req, res) {
    res.render('register');
});

app.get("/addcollection", function (req, res) {
    res.render('addcollection');
});

app.get("/addrecord", function (req, res) {
    res.render('addrecord');
});

app.get("/managecollections", function (req, res) {
    res.render('managecollections');
});

app.get("/managerecords", function (req, res) {
    res.render('managerecords');
});

app.get("/viewcollection", function (req, res) {
    res.render('viewcollection');
});

app.get("/viewrecord", function (req, res) {
    res.render('viewrecord');
});

app.post("/signin", (req,res) => {
    // printing the form data to console as an array
    console.log(req.body);

    // storing the form data as an object
    let userdata = req.body;

    // send data back to home page as a json object
    res.render('index', { sentback : userdata });
})

//server
app.listen(process.env.PORT || 3000);
console.log(" Server is listening on //localhost:3000/ ");