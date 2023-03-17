const express = require(`express`);
const viewrecordR = express.Router();
const connection = require(`../middleware/db`);


viewrecordR.get("/viewrecord", function (req, res) {
    // let recordid = req.params.recordid;
    let showid = req.query.recordid;
    let readsql = 
        `SELECT *
        FROM track
        INNER JOIN record_track
        ON track.track_id = record_track.track_id
        INNER JOIN record
        ON record_track.record_id = record.record_id
        INNER JOIN artist
        ON record.artist_id = artist.artist_id
        WHERE record.record_id = ?`;

    connection.query(readsql, [showid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows;
        res.render(`viewrecord`, { rowdata });
    });
});

module.exports = viewrecordR;
