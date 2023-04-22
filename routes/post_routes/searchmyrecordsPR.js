const express = require(`express`);
const searchmyrecordsPR = express.Router();
const connection = require(`../../middleware/db`);


searchmyrecordsPR.post("/searchmyrecords", (req, res, next) => {

    let sessionobj = req.session;
    let user_id = sessionobj.authen;
    let search_phrase = req.body.searchphrase;
    let filter = req.body.filter;
    
    console.log(filter);

    if (filter == `all`) {

        let search =

        `SELECT * FROM record
        INNER JOIN user
        ON record.user_id = user.user_id
        WHERE record.record_name = ? AND user.user_id = ?;
        
        SELECT *
        FROM user
        WHERE user_id = ?; `;

        connection.query(search, [search_phrase, user_id, user_id], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render(`managerecords`, { rowdata, userdata });

        });

    } else if (filter == `artist`){

        let search =

        `SELECT * FROM record
        INNER JOIN artist
        ON record.artist_id = artist.artist_id
        WHERE artist.artist_name = ? AND record.user_id = ?;
        
        SELECT *
        FROM user
        WHERE user_id = ?; `;

        connection.query(search, [search_phrase, user_id, user_id], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render(`managerecords`, { rowdata, userdata });

        });

    } else if (filter == `genre`){
        
        let search =

        `SELECT * FROM record
        INNER JOIN genre
        ON record.genre_id = genre.genre_id
        WHERE genre.genre_name = ? AND record.user_id = ?;
        
        SELECT *
        FROM user
        WHERE user_id = ?; `;

        connection.query(search, [search_phrase, user_id, user_id], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render(`managerecords`, { rowdata, userdata });

        });
    }

});

module.exports = searchmyrecordsPR;