const express = require(`express`);
const addcollectionR = express.Router();
const connection = require(`../middleware/db`);


addcollectionR.get("/addcollection", function (req, res) {

    let sessionobj = req.session;

    if (sessionobj.authen) {
        let userid = sessionobj.authen;

        let readgenres = 

        `SELECT record_name, record_id
        FROM record
        WHERE user_id=?;
        
        SELECT *
        FROM user
        WHERE user_id = ?;`;

        connection.query(readgenres, [userid, userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render("addcollection", { rowdata, userdata });
        });

    } else {
        let userdata = [];
        res.render('signin', { userdata });
    }
});

module.exports = addcollectionR;