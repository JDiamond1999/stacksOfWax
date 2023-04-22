const express = require(`express`);
const removereviewPR = express.Router();
const connection = require(`../../middleware/db`);


removereviewPR.post("/removereview", (req, res, next) => {

    let reviewid = req.query.reviewid;
    let collectionid = req.body.collectionid;

        let removereview =

        `START TRANSACTION;
        
        DELETE FROM review
        WHERE review_id = ?;
        
        SET @averagerating = 
        (SELECT AVG(star_rating)
        FROM collection
        INNER JOIN review
        ON collection.collection_id = review.collection_id
        WHERE review.collection_id = ?);
        
        UPDATE collection 
        SET rating_average = @averagerating 
        WHERE collection_id = ?;
        
        COMMIT;`;

        connection.query(removereview, [reviewid, collectionid, collectionid], (err, rows) => {
            if (err) throw err;
            res.redirect(`viewOthersCollection?collectionid=${collectionid}`);
        });
    
    
    

});


module.exports = removereviewPR;