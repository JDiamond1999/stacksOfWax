const express = require(`express`);
const signinPR = express.Router();
const connection = require(`../../middleware/db`);
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

signinPR.post("/signin", (req, res) => {

    let email = req.body.email_field;
    let password = req.body.password_field;

    let checkuser =
        'SELECT * FROM user WHERE email_address = ? AND password = ?; ';

    connection.query(checkuser, [email, password], (err, rows) => {
        if (err) throw err;
        let numRows = rows.length;
        if (numRows > 0) {
            let sessionobj = req.session;
            sessionobj.authen = rows[0].user_id;
            res.redirect(`/managerecords`);
        } else {
            res.redirect(`/signin`)
        }
    });


});

module.exports = signinPR;