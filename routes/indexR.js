const express = require(`express`);
const indexR = express.Router();
const connection = require(`../middleware/db`);

indexR.get("/", function (req, res) {

    let sessionobj = req.session;

    let userid = sessionobj.authen;

    let getdetails =
    
        `SELECT username
        FROM user
        WHERE user.user_id = ?`;

    connection.query(getdetails, [userid], (err, rows) => {
        let userdata = rows;
        if (err) throw err;
        res.render("index", { userdata });
    });

});

module.exports = indexR;