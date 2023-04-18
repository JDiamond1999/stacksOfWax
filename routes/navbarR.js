const express = require(`express`);
const navbarR = express.Router();
const connection = require(`../middleware/db`);

navbarR.get("/navbar", function (req, res) {

    let sessionobj = req.session;

    let userid = sessionobj.authen;

    let getdetails =
    `SELECT username
    FROM user
    WHERE user.user_id = ?`;

    connection.query(getdetails, [userid], (err, rows) => {
        let userdata = rows;
        console.log(`hi`);
        if (err) throw err;
        res.redirect("navbar", { userdata });
    });



});

module.exports = navbarR;