const express = require(`express`);
const addtrackPR = express.Router();
const connection = require(`../../middleware/db`);


addtrackPR.post("/addtrack", (req, res) => {

    let recordid = req.query.recordid;
    let track_name = req.body.addtrack;

    let addtrack =
        `INSERT INTO track 
        (track_id, track_name) 
        VALUES (NULL, ?);
        
        SET @trackid = LAST_INSERT_ID();
        
        INSERT INTO record_track
        (record_track_id,record_id,track_id)
        VALUES (NULL, ?, @trackid);`;

    connection.query(addtrack, [track_name, recordid], (err, rows) => {
        if (err) throw err;
    });

    let readtracks =
        `SELECT track.track_id, track_name, record_name,cover_image, record.record_id FROM track 
        INNER JOIN record_track
        ON track.track_id=record_track.track_id
        INNER JOIN record
        ON record_track.record_id=record.record_id
        WHERE record.record_id = ?;`;

    connection.query(readtracks, [recordid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render(`edittracklist`, { rowdata });
    });


});


module.exports = addtrackPR;