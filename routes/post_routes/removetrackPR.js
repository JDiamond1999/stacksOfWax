const express = require(`express`);
const removetrackPR = express.Router();
const connection = require(`../../middleware/db`);


removetrackPR.post("/removetrack", (req, res) => {

    let recordid = req.query.recordid;
    let track_id = req.body.trackid;

    let removetrack =
        `DELETE FROM record_track 
        WHERE record_track.track_id = ?;
        
        DELETE FROM track 
        WHERE track.track_id = ?;`;

    connection.query(removetrack, [track_id, track_id], (err, rows) => {
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


module.exports = removetrackPR;