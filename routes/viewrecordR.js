const express = require(`express`);
const viewrecordR = express.Router();
const connection = require(`../middleware/db`);
const axios = require('axios');

viewrecordR.get("/viewrecord", function (req, res) {
    let showid = req.query.recordid;
    let sessionobj = req.session;
    let userid = sessionobj.authen;

    const apiKey = '4aa7f58b70dbf307b6d4f0e97aae94fb';
    const apiUrl = 'http://ws.audioscrobbler.com/2.0/';

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
        
        SELECT genre_name, genre_desc
        FROM genre
        INNER JOIN record
        ON genre.genre_id = record.genre_id
        WHERE record.record_id = ?;
        
        SELECT *
        FROM user
        INNER JOIN record
        ON user.user_id = record.user_id
        WHERE record_id = ?;
        
        SELECT user_id, username
        FROM user
        WHERE user_id = ?;`;

    connection.query(readsql, [showid, showid, showid, userid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows[0];
        let genredata = rows[1];
        let ownerdata = rows[2];
        let userdata = rows[3];
        

        // pulling artist name from stacks of wax database
        const artistname = rows[0][0].artist_name;

        // parameters for GET request
        const params = {
            method: 'artist.getSimilar',
            artist: artistname,
            api_key: apiKey,
            format: 'json'
        };

        axios.get(apiUrl, { params })
            .then(response => {
                // Return the first three elements of the array;
                const similarartists = response.data.similarartists.artist.map(artist => artist.name).slice(0, 3);
                res.render(`viewrecord`, { rowdata, genredata, ownerdata, userdata, userid, similarartists });
            })
            .catch(error => {
                console.error(error);
                // Omit similar artists if there is an error
                res.render(`viewrecord`, { rowdata, genredata, ownerdata, userdata, userid });
            });
    });
});


module.exports = viewrecordR;
