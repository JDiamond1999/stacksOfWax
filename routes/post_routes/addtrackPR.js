const express = require(`express`);
const addtrackPR = express.Router();
const connection = require(`../../middleware/db`);


addtrackPR.post("/addtrack", (req, res) => {

    let recordid = req.query.recordid;
    let track_name = req.body.addtrack;

    let addtrack =

        `START TRANSACTION;
        
        INSERT INTO track 
        (track_id, track_name) 
        VALUES (NULL, ?);
        
        SET @trackid = LAST_INSERT_ID();
        
        INSERT INTO record_track
        (record_track_id,record_id,track_id)
        VALUES (NULL, ?, @trackid);
        
        COMMIT;`;

    connection.query(addtrack, [track_name, recordid], (err, rows) => {
        if (err) throw err;
    });

    res.redirect(`edittracklist?recordid=${recordid}`);


});


module.exports = addtrackPR;