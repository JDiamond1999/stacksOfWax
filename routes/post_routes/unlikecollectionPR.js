const express = require(`express`);
const unlikecollectionPR = express.Router();
const connection = require(`../../middleware/db`);


unlikecollectionPR.get("/unlikecollection", (req, res) => {

    let collectionid = req.query.collectionid;
    let sessionobj = req.session;
    let userid = sessionobj.authen;

    let addlike =
        `DELETE user_liked_collection, liked_collection
        FROM user_liked_collection
        INNER JOIN liked_collection
        ON user_liked_collection.liked_collection_id = liked_collection.liked_collection_id
        WHERE user_liked_collection.user_id = ? AND liked_collection.collection_id = ?;
        
        SET @collectionlikes = 
        (SELECT collection_likes
        FROM collection 
        WHERE collection_id = ?);
        
        SET @collectionlikes = @collectionlikes - 1;
        
        UPDATE collection 
        SET collection_likes = @collectionlikes
        WHERE collection_id = ?; `;

    connection.query(addlike, [userid, collectionid, collectionid, collectionid], (err, rows) => {
        if (err) throw err;
    });

    res.redirect(`viewOthersCollection?collectionid=${collectionid}`);


});


module.exports = unlikecollectionPR;