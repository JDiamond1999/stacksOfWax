const express = require(`express`);
const addrecordPR = express.Router();
const connection = require(`../../middleware/db`);


addrecordPR.post("/addrecord", (req, res) => {

    let sessionobj = req.session;

    let userid = sessionobj.authen;
    let image_link = req.body.imagelink;
    let title = req.body.title;
    let artist = req.body.artist;
    let release_year = req.body.releaseyear;
    let record_label = req.body.recordlabel;
    let genre_id = req.body.genre;


    let insertartistrecord =
        `INSERT INTO artist
        (artist_name, artist_desc)
         VALUES (?, "null");

        SET @artistid = LAST_INSERT_ID();
  
        INSERT INTO record
        (record_name, cover_image, year_of_release, record_label, record_likes, genre_id, artist_id, user_id )
        VALUES( ? , ? , ? , ? , 0 , ? , @artistid, ? );
        
        SET @recordid = LAST_INSERT_ID();
        
        INSERT INTO record_track 
        (record_track_id, record_id, track_id) 
        VALUES (NULL, @recordid, '180');`;

    connection.query(
        insertartistrecord,
        [artist, title, image_link, release_year, record_label, genre_id, userid],
        (err, rows) => {
            if (err) throw err;
        });



    if (sessionobj.authen) {


        // chris says dont use select * from as it increases loading time/dont need resources
        let readrecords =
            `SELECT * 
                FROM user
                INNER JOIN record
                ON user.user_id = record.user_id
                INNER JOIN artist 
                ON record.artist_id=artist.artist_id
                WHERE user.user_id = ?;
                
                SELECT *
                FROM user
                WHERE user_id = ? `;

        connection.query(readrecords, [userid, userid], (err, rows) => {
            if (err) throw err;
            let rowdata = rows[0];
            let userdata = rows[1];
            res.render("managerecords", { rowdata, userdata });
        });

    } else {
        res.send("denied");
    }
});


module.exports = addrecordPR;