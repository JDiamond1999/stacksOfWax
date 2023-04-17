const express = require(`express`);
const signinR = express.Router();
const connection = require(`../middleware/db`);

signinR.get("/signin", function (req, res) {

    let sessionobj = req.session;

    let userid = sessionobj.authen;

    let getdetails =
    `SELECT username
    FROM user
    WHERE user.user_id = ?`;

    connection.query(getdetails, [userid], (err, rows) => {
        let userdata = rows;
        if (err) throw err;
        res.render("signin", { userdata });
    });



});

module.exports = signinR;