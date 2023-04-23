const express = require(`express`);
const signinPR = express.Router();
const connection = require(`../../middleware/db`);
const cookieParser = require('cookie-parser');
const sessions = require('express-session');

const bcrypt = require('bcrypt');

signinPR.post("/signin", (req, res) => {

    let email = req.body.email_field;
    let password = req.body.password_field;

    let loadhash =

        `SELECT password, user_id FROM user WHERE email_address = ?;`;

    connection.query(loadhash, [email], (err, rows) => {

        if (err) throw err;
        let hash = rows[0].password;

        bcrypt.compare(password, hash, function (err, result) {

            if (result) {

                let sessionobj = req.session;
                sessionobj.authen = rows[0].user_id;
                res.redirect(`/managerecords`);

            } else {
                res.redirect(`/signin`);

            }
        });

    });

});

module.exports = signinPR;