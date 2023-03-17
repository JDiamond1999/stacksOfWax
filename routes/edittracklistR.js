const express = require(`express`);
const edittracklistR = express.Router();
const connection = require(`../middleware/db`);


edittracklistR.get("/edittracklist", (req, res) => {

    let showid = req.query.recordid;

    let readtracks =
        `SELECT track.track_id, track_name, record_name,cover_image, record.record_id FROM track 
        INNER JOIN record_track
        ON track.track_id=record_track.track_id
        INNER JOIN record
        ON record_track.record_id=record.record_id
        WHERE record.record_id = ?;`;

    connection.query(readtracks, [showid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render(`edittracklist`, { rowdata });
    });

});

module.exports = edittracklistR;