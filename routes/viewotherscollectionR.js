const express = require(`express`);
const viewotherscollectionR = express.Router();
const connection = require(`../middleware/db`);


viewotherscollectionR.get("/viewotherscollection", function (req, res) {

    let sessionobj = req.session;
    let userid = sessionobj.authen;
    let showid = req.query.collectionid;

    // chris says dont use select * from as it increases loading time/dont need resources
    let readrecords =
        `SELECT * 
            FROM user
            INNER JOIN collection
            ON user.user_id = collection.user_id
            INNER JOIN collection_record
            ON collection.collection_id = collection_record.collection_id
            INNER JOIN record 
            ON collection_record.record_id=record.record_id
            INNER JOIN artist
            ON record.artist_id=artist.artist_id
            WHERE collection.collection_id = ?;
            
            SELECT *
            FROM user
            WHERE user_id = ?;
            
            SELECT record_name, record_id
            FROM record
            WHERE user_id=?;
            
            SELECT *
            FROM review
            INNER JOIN user
            ON review.user_id = user.user_id
            WHERE collection_id = ?;

            SELECT * FROM
            user_liked_collection
            WHERE user_liked_collection.user_id = ? AND user_liked_collection.collection_id = ?;
            
            SELECT COUNT(*)
            FROM user_liked_collection
            WHERE user_liked_collection.collection_id = ?;
            
            SELECT AVG(star_rating)
            FROM collection
            INNER JOIN review
            ON collection.collection_id = review.collection_id
            WHERE review.collection_id = ?`;

    connection.query(readrecords, [showid, userid, userid, showid, userid, showid, showid, showid], (err, rows) => {
        if (err) throw err;
        let rowdata = rows[0];
        let userdata = rows[1];
        let userrecords = rows[2];
        let reviews = rows[3];
        let likedstatus = rows[4];
        let likecount = rows[5][0][`COUNT(*)`];
        let averagestars = rows[6][0][`AVG(star_rating)`];
        
        
        if(Number.isInteger(averagestars)){
            let realaveragestars = averagestars;
            res.render("viewotherscollection", { rowdata, userdata, userrecords, reviews, likedstatus, likecount, averagestars, realaveragestars });
        } else if (averagestars>0){
            let realaveragestars = parseFloat(averagestars).toFixed(1);;
            averagestars = Math.floor(averagestars);
            res.render("viewotherscollection", { rowdata, userdata, userrecords, reviews, likedstatus, likecount, averagestars, realaveragestars });
        } else {
            let realaveragestars = 0;
            res.render("viewotherscollection", { rowdata, userdata, userrecords, reviews, likedstatus, likecount, averagestars, realaveragestars });
        }
        
        
        
    });


});

module.exports = viewotherscollectionR;

