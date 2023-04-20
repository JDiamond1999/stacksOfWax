const express = require(`express`);
const edittracklistR = express.Router();
const connection = require(`../middleware/db`);


edittracklistR.get("/edittracklist", (req, res) => {

    let sessionobj = req.session;

    if (sessionobj.authen) {

        let userid = sessionobj.authen;

        let showid = req.query.recordid;

        let readtracks =
            `SELECT track.track_id, track_name, record_name,cover_image, record.record_id FROM track 
        INNER JOIN record_track
        ON track.track_id=record_track.track_id
        INNER JOIN record
        ON record_track.record_id=record.record_id
        WHERE record.record_id = ?;
        
        SELECT username
        FROM user
        WHERE user.user_id = ?;`;

        connection.query(readtracks, [showid,userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render(`edittracklist`, { rowdata, userdata });
        });

    } else {
        let userdata = [];
        res.render('signin', { userdata });
    }

});

module.exports = edittracklistR;