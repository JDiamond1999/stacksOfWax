const express = require(`express`);
const addcollectionR = express.Router();
const connection = require(`../middleware/db`);


addcollectionR.get("/addcollection", function (req, res) {

    let sessionobj = req.session;

    if (sessionobj.authen) {
        let userid = sessionobj.authen;

        let readgenres = `SELECT record_name, record_id
    FROM record
    WHERE user_id=?;`;

        connection.query(readgenres, [userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows;
            res.render("addcollection", { rowdata });
        });

    } else {
        let userdata = [];
        res.render('signin', { userdata });
    }
});

module.exports = addcollectionR;