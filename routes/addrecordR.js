const express = require(`express`);
const addrecordR = express.Router();
const connection = require(`../middleware/db`);

addrecordR.get("/addrecord", function (req, res) {
    let readgenres = `SELECT genre_name, genre_id 
    FROM genre;`;

    connection.query(readgenres, (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render("addrecord", { rowdata });
    });
});

module.exports = addrecordR;