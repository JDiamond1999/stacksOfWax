const express = require(`express`);
const registerR = express.Router();
const connection = require(`../middleware/db`);

registerR.get("/register", function (req, res) {
    let sessionobj = req.session;

    let userid = sessionobj.authen;

    let getdetails =
    
        `SELECT username
        FROM user
        WHERE user.user_id = ?;`;

    connection.query(getdetails, [userid], (err, rows) => {
        let userdata = rows;
        if (err) throw err;
        res.render("register", { userdata });
    });

});

module.exports = registerR;