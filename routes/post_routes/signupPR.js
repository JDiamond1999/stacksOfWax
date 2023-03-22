const express = require(`express`);
const signupPR = express.Router();
const connection = require(`../../middleware/db`);
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

signupPR.post("/signup", (req, res) => {

    let username = req.body.username_field;
    let first_name = req.body.first_name_field;
    let last_name = req.body.last_name_field;
    let email = req.body.email_field;
    let password = req.body.password_field;

    let insertuser =
    `INSERT INTO user 
    (user_id, username, first_name, last_name, email_address, password) 
    VALUES (NULL, ?, ?, ?, ?, ?);`

    connection.query(insertuser, [username, first_name, last_name, email, password], (err, rows) => {
        if (err) throw err;
        res.redirect(`/signin`);
    });


});

module.exports = signupPR;