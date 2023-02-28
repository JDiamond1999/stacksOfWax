//node modules
const express = require("express");
let app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mysql = require(`mysql`);

//middleware
app.use(express.static(path.join(__dirname, './css')));
app.use(express.static(path.join(__dirname, './images')));
app.use(bodyParser.urlencoded({ extend: true }));

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

// trying to load in our data from sql
app.get("/managerecords", function (req, res) {

    let readrecords = 
    `SELECT * 
    FROM record 
    INNER JOIN artist 
    ON record.artist_id=artist.artist_id`;
    
    connection.query(readrecords, (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render('managerecords', { rowdata });
    });
});

app.get("/viewcollection", function (req, res) {
    res.render('viewcollection');
});

app.get("/viewrecord", function (req, res) {
    let showid = req.query.recordid;
    let readsql = 
    `SELECT *
    FROM track
    INNER JOIN record_track
    ON track.track_id = record_track.track_id
    INNER JOIN record
    ON record_track.record_id = record.record_id
    INNER JOIN artist
    ON record.artist_id = artist.artist_id
    WHERE record.record_id = ?`;

    connection.query(readsql, [showid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render(`viewrecord`, { rowdata });
    });

});

// app.post("/signin", (req,res) => {
//     // printing the form data to console as an array
//     console.log(req.body);

//     // storing the form data as an object
//     let userdata = req.body;

//     // send data back to home page as a json object
//     res.render('index', { sentback : userdata });
// })

app.post("/register", (req, res) => {
    // printing the form data to console as an array
    console.log(req.body);

    // storing the form data as an object
    let userdata = req.body;

    // send data back to home page as a json object
    res.render('index', { sentback: userdata });
})

// port 3306 is the port our database is using (just check on xampp to make sure)
const connection = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `stacks of wax 1`,
    port: `3306`,
});

connection.connect(function (err) {
    if (err) {
        return console.error(`error` + err.message);
    }

    console.log(`Connected to MySql Server`);
});



//server
app.listen(process.env.PORT || 3000);
console.log(" Server is listening on //localhost:3000/ ");