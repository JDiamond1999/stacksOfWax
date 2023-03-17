const express = require(`express`);
const managerecordsR = express.Router();
const connection = require(`../middleware/db`);


// trying to load in our data from sql
managerecordsR.get("/managerecords", function (req, res) {
    // chris says dont use select * from as it increases loading time/dont need resources
    let readrecords = 
        `SELECT * 
        FROM record 
        INNER JOIN artist 
        ON record.artist_id=artist.artist_id;`;

    connection.query(readrecords, (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render("managerecords", { rowdata });
    });
});

module.exports = managerecordsR;