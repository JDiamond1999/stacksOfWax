const express = require(`express`);
const managecollectionsR = express.Router();
const connection = require(`../middleware/db`);


managecollectionsR.get("/managecollections", function (req, res) {

    let sessionobj = req.session;

    if (sessionobj.authen) {

        let userid = sessionobj.authen;

        // chris says dont use select * from as it increases loading time/dont need resources
        let readcollections =
            `SELECT * 
            FROM user
            INNER JOIN collection
            ON user.user_id = collection.user_id
            WHERE user.user_id = ?;
            
            SELECT *
            FROM user
            WHERE user_id = ? `;

        connection.query(readcollections, [userid, userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render("managecollections", { rowdata, userdata });
        });

    } else {
        let userdata = [];
        res.render('signin', {userdata});
    }
});

module.exports = managecollectionsR;