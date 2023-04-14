const express = require(`express`);
const searchcollectionsR = express.Router();
const connection = require(`../middleware/db`);


searchcollectionsR.get("/searchcollections", function (req, res) {

    let sessionobj = req.session;
    let userid = sessionobj.authen;

    if (sessionobj.authen) {

        // chris says dont use select * from as it increases loading time/dont need resources
        let readcollections =
            `SELECT * 
            FROM collection
            INNER JOIN user
            ON collection.user_id = user.user_id;`;

        connection.query(readcollections, (err, rows) => {
            if (err) throw err;
            let rowdata = rows;
           
            res.render("searchcollections", { rowdata });
        });

    } else {
        res.render('signin');
    }
});

module.exports = searchcollectionsR;