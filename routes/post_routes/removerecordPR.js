const express = require(`express`);
const removerecordPR = express.Router();
const connection = require(`../../middleware/db`);


removerecordPR.post("/removerecord", (req, res, next) => {

    let recordid = req.query.recordid;

    let removerecord =
        `DELETE FROM track 
        WHERE record_track.track_id = ?;
        
        DELETE FROM track 
        WHERE track.track_id = ?;`;

    connection.query(removerecord, [track_id, track_id], (err, rows) => {
        if (err) throw err;
    });

    res.redirect(`edittracklist?recordid=${recordid}`);

});


module.exports = removerecordPR;