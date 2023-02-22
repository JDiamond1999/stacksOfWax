//node modules
const express = require("express");
let app = express();
const path = require("path");

//middleware
app.use(express.static(path.join(__dirname, './css')));
app.use(express.static(path.join(__dirname, './images')));

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

//server
app.listen(process.env.PORT || 3000);
console.log(" Server is listening on //localhost:3000/ ");