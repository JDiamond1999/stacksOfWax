const express = require(`express`);
const removerecordPR = express.Router();
const connection = require(`../../middleware/db`);


removerecordPR.post("/removerecord", (req, res, next) => {

    let recordid = req.query.recordid;

    let removerecord =

        `START TRANSACTION;
        
        DELETE record_track, track
        FROM record_track
        INNER JOIN track
        ON record_track.track_id = track.track_id
        WHERE record_id = ? AND track.track_id != 186;

        DELETE record_track
        FROM record_track
        WHERE track_id = 186;
        
        DELETE collection_record
        FROM collection_record
        WHERE collection_record.record_id = ?;
        
        DELETE record, artist
        FROM record
        INNER JOIN artist
        ON record.artist_id = artist.artist_id
        WHERE record.record_id = ?;
        
        COMMIT;`;

    connection.query(removerecord, [recordid, recordid, recordid], (err, rows) => {
        if (err) throw err;
        res.redirect(`/managerecords`);
    });
    

});


module.exports = removerecordPR;