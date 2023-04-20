const express = require(`express`);
const addrecordR = express.Router();
const connection = require(`../middleware/db`);

addrecordR.get("/addrecord", function (req, res) {

    let sessionobj = req.session;

    if (sessionobj.authen) {

        let userid = sessionobj.authen;

        let readgenres = 
        `SELECT genre_name, genre_id 
        FROM genre;
        
        SELECT username
        FROM user
        WHERE user.user_id = ?;`;

        connection.query(readgenres,[userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render("addrecord", { rowdata, userdata });
        });

    } else {
        let userdata = [];
        res.render('signin', { userdata });
    }
});

module.exports = addrecordR;