const express = require(`express`);
const viewrecordR = express.Router();
const connection = require(`../middleware/db`);


viewrecordR.get("/viewrecord", function (req, res) {
    // let recordid = req.params.recordid;
    let showid = req.query.recordid;


    let sessionobj = req.session;
    let userid = sessionobj.authen;


    let readsql =
        `SELECT cover_image, record_name, artist_name, record_label, year_of_release, track_name, record.record_id
        FROM track
        INNER JOIN record_track
        ON track.track_id = record_track.track_id
        INNER JOIN record
        ON record_track.record_id = record.record_id
        INNER JOIN artist
        ON record.artist_id = artist.artist_id
        WHERE record.record_id = ?;
        
        SELECT genre_name
        FROM genre
        INNER JOIN record
        ON genre.genre_id = record.genre_id
        WHERE record.record_id = ?;
        
        SELECT *
        FROM user
        INNER JOIN record
        ON user.user_id = record.user_id
        WHERE record_id = ?`;

    connection.query(readsql, [showid, showid, showid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows[0];
        let genredata = rows[1];
        let userdata = rows[2];
        res.render(`viewrecord`, { rowdata, genredata, userdata, userid});
    });


});

module.exports = viewrecordR;
