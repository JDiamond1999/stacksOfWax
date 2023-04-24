const express = require(`express`);
const viewcollectionR = express.Router();
const connection = require(`../middleware/db`);


viewcollectionR.get("/viewcollection", function (req, res) {
    
    let sessionobj = req.session;
    let userid = sessionobj.authen;
    let showid = req.query.collectionid;

    if (sessionobj.authen) {
        
        let readrecords =
            
            `SELECT collection_image, collection_name, collection.collection_id, cover_image, record_name, record.record_id 
            FROM collection
            INNER JOIN collection_record
            ON collection.collection_id = collection_record.collection_id
            INNER JOIN record 
            ON collection_record.record_id=record.record_id
            INNER JOIN artist
            ON record.artist_id=artist.artist_id
            WHERE collection.collection_id = ?;
            
            SELECT username
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