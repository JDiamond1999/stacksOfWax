// Node modules (Require)
const express = require("express");
let app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require(`cookie-parser`);
const sessions = require('express-session');

// Middleware and Get Routes (Require)
const oneHour = 1000 * 60 * 60 * 1;
const globalErrHandler = require(`./middleware/errorhandler`);
const indexR = require(`./routes/indexR`);
const signinR = require(`./routes/signinR`);
const registerR = require(`./routes/registerR`);
const addcollectionR = require(`./routes/addcollectionR`);
const managecollectionsR = require(`./routes/managecollectionsR`);
const viewcollectionR = require(`./routes/viewcollectionR`);
const addrecordR = require(`./routes/addrecordR`);
const edittracklistR = require(`./routes/edittracklistR`);
const managerecordsR = require(`./routes/managerecordsR`);
const viewrecordR = require(`./routes/viewrecordR`);

// Post routes (Require)
const addtrackPR = require(`./routes/post_routes/addtrackPR`);
const removetrackPR = require(`./routes/post_routes/removetrackPR`);
const addrecordPR = require(`./routes/post_routes/addrecordPR`);
const registerPR = require(`./routes/post_routes/registerPR`);
const signinPR = require(`./routes/post_routes/signinPR`);
const signupPR = require(`./routes/post_routes/signupPR`);
const addcollectionPR = require(`./routes/post_routes/addcollectionPR`);

// Middleware (Use)
app.use(express.static(path.join(__dirname, "./css")));
app.use(express.static(path.join(__dirname, "./images")));
app.use(bodyParser.urlencoded({ extend: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessions({
    secret: 'thisisasecret',
    saveUninitialized: true,
    cookie: { maxAge: oneHour },
    resave: false
})
);

// Get Routes (Use)
app.use(globalErrHandler);
app.use(`/`, indexR);
app.use(`/`, signinR);
app.use(`/`, registerR);
app.use(`/`, addcollectionR);
app.use(`/`, managecollectionsR);
app.use(`/`, viewcollectionR);
app.use(`/`, addrecordR);
app.use(`/`, edittracklistR);
app.use(`/`, managerecordsR);
app.use(`/`, viewrecordR);

// Post Routes (Use)
app.use(`/`, addtrackPR);
app.use(`/`, removetrackPR);
app.use(`/`, addrecordPR);
app.use(`/`, registerPR);
app.use(`/`, signinPR);
app.use(`/`, signupPR);
app.use(`/`, addcollectionPR);

// View Engine Setup
app.set("view engine", "ejs");

// Server Setup
app.listen(process.env.PORT || 3000);
console.log(" Server is listening on //localhost:3000/ ");

