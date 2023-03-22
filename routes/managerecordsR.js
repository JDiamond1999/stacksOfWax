const express = require(`express`);
const managerecordsR = express.Router();
const connection = require(`../middleware/db`);


// trying to load in our data from sql
managerecordsR.get("/managerecords", function (req, res) {

    let sessionobj = req.session;

    if (sessionobj.authen) {

        let userid = sessionobj.authen;
        // chris says dont use select * from as it increases loading time/dont need resources
        let readrecords =
            `SELECT * 
            FROM user
            INNER JOIN record
            ON user.user_id = record.user_id
            INNER JOIN artist 
            ON record.artist_id=artist.artist_id
            WHERE user.user_id = ?;
            
            SELECT *
            FROM user
            WHERE user_id = ? `;

        connection.query(readrecords, [userid, userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render("managerecords", { rowdata, userdata });
        });

    } else {
        res.send("denied");
    }


});

module.exports = managerecordsR;