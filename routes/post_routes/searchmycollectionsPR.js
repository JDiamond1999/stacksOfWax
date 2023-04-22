const express = require(`express`);
const searchmycollectionsPR = express.Router();
const connection = require(`../../middleware/db`);


searchmycollectionsPR.post("/searchmycollections", (req, res, next) => {

    let sessionobj = req.session;
    let user_id = sessionobj.authen;
    let collection_name = req.body.searchphrase;

    let search =
    
        `SELECT * FROM collection
        INNER JOIN user
        ON collection.user_id = user.user_id
        WHERE collection.collection_name = ? AND user.user_id = ?;
        
        SELECT *
        FROM user
        WHERE user_id = ?; `;

    connection.query(search, [collection_name, user_id, user_id], (err, rows) => {
        if (err) throw err;
        let rowdata = rows[0];
        let userdata = rows[1];
        res.render(`managecollections`, { rowdata, userdata });

    });

});

module.exports = searchmycollectionsPR;