//node modules
const express = require("express");
let app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require(`mysql`);

//middleware
app.use(express.static(path.join(__dirname, "./css")));
app.use(express.static(path.join(__dirname, "./images")));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//routes
app.get("/", function (req, res) {
    res.render("index");
});

app.get("/signin", function (req, res) {
    res.render("signin");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/addcollection", function (req, res) {
    res.render("addcollection");
});

app.get("/addrecord", function (req, res) {
    let readgenres = `SELECT genre_name, genre_id 
    FROM genre;`;

    connection.query(readgenres, (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render("addrecord", { rowdata });
    });
});

app.get("/edittracklist", (req, res) => {

    let showid = req.query.recordid;

    let readtracks =
        `SELECT track.track_id, track_name, record_name,cover_image, record.record_id FROM track 
        INNER JOIN record_track
        ON track.track_id=record_track.track_id
        INNER JOIN record
        ON record_track.record_id=record.record_id
        WHERE record.record_id = ?;`;

    connection.query(readtracks, [showid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render(`edittracklist`, { rowdata });
    });

});

app.post("/addtrack", (req, res) => {

    let recordid = req.query.recordid;
    let track_name = req.body.addtrack;

    console.log(recordid);

    let addtrack =
        `INSERT INTO track 
        (track_id, track_name) 
        VALUES (NULL, ?);
        
        SET @trackid = LAST_INSERT_ID();
        
        INSERT INTO record_track
        (record_track_id,record_id,track_id)
        VALUES (NULL, ?, @trackid);`;

    connection.query(addtrack, [track_name, recordid], (err, rows) => {
        if (err) throw err;
    });

    let readtracks =
    `SELECT track.track_id, track_name, record_name,cover_image, record.record_id FROM track 
    INNER JOIN record_track
    ON track.track_id=record_track.track_id
    INNER JOIN record
    ON record_track.record_id=record.record_id
    WHERE record.record_id = ?;`;

    connection.query(readtracks, [recordid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render(`edittracklist`, { rowdata });
    });


});



// app.post("/updatetracklist", (req, res) => {

//     let showid = req.query.recordid;
//     let track_name = req.body.trackname;

//     console.log(track_name);



// });


app.post("/addrecord", (req, res) => {

    let image_link = req.body.imagelink;
    let title = req.body.title;
    let artist = req.body.artist;
    let release_year = req.body.releaseyear;
    let record_label = req.body.recordlabel;
    let genre_id = req.body.genre;


    let insertartistrecord =
        `INSERT INTO artist
        (artist_name, artist_desc)
         VALUES (?, "null");

        SET @artistid = LAST_INSERT_ID();
  
        INSERT INTO record
        (record_name, cover_image, year_of_release, record_label, record_likes, genre_id, artist_id )
        VALUES( ? , ? , ? , ? , 0 , ? , @artistid );
        
        SET @recordid = LAST_INSERT_ID();
        
        INSERT INTO record_track 
        (record_track_id, record_id, track_id) 
        VALUES (NULL, @recordid, '73');`;

    connection.query(
        insertartistrecord,
        [artist, title, image_link, release_year, record_label, genre_id],
        (err, rows) => {
            if (err) throw err;
        });

    let readrecords =
        `SELECT * 
        FROM record 
        INNER JOIN artist 
        ON record.artist_id=artist.artist_id;`;

    connection.query(readrecords, (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render("managerecords", { rowdata });
    });
});

app.get("/managecollections", function (req, res) {
    res.render("managecollections");
});

// trying to load in our data from sql
app.get("/managerecords", function (req, res) {
    // chris says dont use select * from as it increases loading time/dont need resources
    let readrecords = `SELECT * 
    FROM record 
    INNER JOIN artist 
    ON record.artist_id=artist.artist_id;`;

    connection.query(readrecords, (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render("managerecords", { rowdata });
    });
});

app.get("/viewcollection", function (req, res) {
    res.render("viewcollection");
});

app.get("/viewrecord", function (req, res) {
    let showid = req.query.recordid;
    let readsql = `SELECT *
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
    res.render("index", { sentback: userdata });
});

// port 3306 is the port our database is using (just check on xampp to make sure)
const connection = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: ``,
    database: `stacks_of_wax_1`,
    port: `3306`,
    multipleStatements: `true`,
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
