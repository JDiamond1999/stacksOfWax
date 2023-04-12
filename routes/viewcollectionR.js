const express = require(`express`);
const viewcollectionR = express.Router();
const connection = require(`../middleware/db`);


viewcollectionR.get("/viewcollection", function (req, res) {
    
    let sessionobj = req.session;
    let userid = sessionobj.authen;
    let showid = req.query.collectionid;

    

    if (sessionobj.authen) {
        // chris says dont use select * from as it increases loading time/dont need resources
        let readrecords =
            `SELECT * 
            FROM collection
            INNER JOIN collection_record
            ON collection.collection_id = collection_record.collection_id
            INNER JOIN record 
            ON collection_record.record_id=record.record_id
            INNER JOIN artist
            ON record.artist_id=artist.artist_id
            WHERE collection.collection_id = ?;
            
            SELECT *
            FROM user
            WHERE user_id = ?;
            
            SELECT record_name, record_id
            FROM record
            WHERE user_id=?;`;

        connection.query(readrecords, [showid, userid, userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            let userrecords = rows[2];
            res.render("viewcollection", { rowdata, userdata, userrecords });
        });

    } else {
        res.render('signin');
    }
});

module.exports = viewcollectionR;