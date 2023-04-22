const express = require(`express`);
const removetrackPR = express.Router();
const connection = require(`../../middleware/db`);


removetrackPR.post("/removetrack", (req, res, next) => {

    let recordid = req.query.recordid;
    let track_id = req.body.trackid;
    let input = req.body.edit;

    if (input == `remove`) {

        let removetrack =

        `START TRANSACTION;
        
        DELETE FROM record_track 
        WHERE record_track.track_id = ?;
        
        DELETE FROM track 
        WHERE track.track_id = ?;
        
        COMMIT;`;

        connection.query(removetrack, [track_id, track_id], (err, rows) => {
            if (err) throw err;
        });

    } else if (input == `update`) {

        let trackname = req.body.trackname;
        let updatetrack =

        `UPDATE track 
        SET track_name = ? 
        WHERE track_id = ?;`;

        connection.query(updatetrack, [trackname, track_id], (err, rows) => {
            if (err) throw err;
        });

    }
    
    res.redirect(`edittracklist?recordid=${recordid}`);

});


module.exports = removetrackPR;