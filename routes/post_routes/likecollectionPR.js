const express = require(`express`);
const likecollectionPR = express.Router();
const connection = require(`../../middleware/db`);


likecollectionPR.get("/likecollection", (req, res) => {

    let collectionid = req.query.collectionid;
    let sessionobj = req.session;
    let userid = sessionobj.authen;

    let addlike =
        `INSERT INTO liked_collection 
        (liked_collection_id, collection_id) 
        VALUES (NULL, ?);
        
        SET @likedcollectionid = LAST_INSERT_ID();
        
        INSERT INTO user_liked_collection 
        (user_liked_collection_id, user_id, liked_collection_id) 
        VALUES (NULL, ?, @likedcollectionid);
        
        SET @collectionlikes = 
        (SELECT collection_likes
        FROM collection 
        WHERE collection_id = ?);
        
        SET @collectionlikes = @collectionlikes + 1;
        
        UPDATE collection 
        SET collection_likes = @collectionlikes
        WHERE collection_id = ? `;

    connection.query(addlike, [collectionid, userid, collectionid, collectionid ], (err, rows) => {
        if (err) throw err;
    });

    res.redirect(`viewOthersCollection?collectionid=${collectionid}`);


});


module.exports = likecollectionPR;