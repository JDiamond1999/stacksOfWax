const express = require(`express`);
const searchmyrecordsPR = express.Router();
const connection = require(`../../middleware/db`);


searchmyrecordsPR.post("/searchmyrecords", (req, res, next) => {

    let sessionobj = req.session;
    let user_id = sessionobj.authen;
    let record_name = req.body.searchphrase;

    let search =
        `SELECT * FROM record
        INNER JOIN user
        ON record.user_id = user.user_id
        WHERE record.record_name = ? AND user.user_id = ?;
        
        SELECT *
        FROM user
        WHERE user_id = ?; `;

    connection.query(search, [record_name, user_id, user_id], (err, rows) => {
        if (err) throw err;
        let rowdata = rows[0];
        let userdata = rows[1];
        console.log(rowdata);
        res.render(`managerecords`, { rowdata, userdata });

    });

});

module.exports = searchmyrecordsPR;