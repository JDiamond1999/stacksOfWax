const express = require(`express`);
const removefromcollectionPR = express.Router();
const connection = require(`../../middleware/db`);


removefromcollectionPR.post("/removefromcollection", (req, res, next) => {

    let collection_id = req.query.collectionid;
    let record_id = req.body.recordid;
    
    let removerecord =
    
        `DELETE FROM collection_record
        WHERE collection_record.collection_id = ? AND collection_record.record_id = ?;`

        connection.query(removerecord, [collection_id, record_id], (err, rows) => {
            if (err) throw err;
        });
    
    res.redirect(`viewCollection?collectionid=${collection_id}`);

});


module.exports = removefromcollectionPR;