const express = require(`express`);
const removecollectionPR = express.Router();
const connection = require(`../../middleware/db`);


removecollectionPR.post("/removecollection", (req, res, next) => {

    let collectionid = req.query.collectionid;

    let removecollection =
        `DELETE collection_record
        FROM collection_record
        WHERE collection_id = ?;
        
        DELETE review
        FROM review
        WHERE collection_id = ?;
        
        DELETE user_liked_collection
        FROM user_liked_collection
        WHERE collection_id = ?;
        
        DELETE collection
        FROM collection 
        WHERE collection_id = ?;`;

    connection.query(removecollection, [collectionid, collectionid, collectionid, collectionid], (err, rows) => {
        if (err) throw err;
        res.redirect(`/managecollections`);
    });
    

});


module.exports = removecollectionPR;