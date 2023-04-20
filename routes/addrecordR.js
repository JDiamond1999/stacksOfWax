const express = require(`express`);
const addrecordR = express.Router();
const connection = require(`../middleware/db`);

addrecordR.get("/addrecord", function (req, res) {

    let sessionobj = req.session;

    if (sessionobj.authen) {

        let readgenres = `SELECT genre_name, genre_id 
    FROM genre;`;

        connection.query(readgenres, (err, rows) => {
            if (err) throw err;
            let rowdata = rows;
            res.render("addrecord", { rowdata });
        });

    } else {
        let userdata = [];
        res.render('signin', { userdata });
    }
});

module.exports = addrecordR;