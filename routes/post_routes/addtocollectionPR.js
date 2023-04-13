const express = require(`express`);
const addtocollectionPR = express.Router();
const connection = require(`../../middleware/db`);



addtocollectionPR.post("/addtocollection", (req, res) => {

    let record_id = req.body.record;
    let collection_id = req.query.collectionid;

    if (record_id == `--Add a Record--`) {
        res.redirect(`viewCollection?collectionid=${collection_id}`);
    } else {

        let addtocollection =

            `INSERT INTO collection_record
        (collection_id, record_id)
        VALUES(?, ?);`

        connection.query(addtocollection, [collection_id, record_id], (err, rows) => {
            if (err) throw err;
        });

        res.redirect(`viewCollection?collectionid=${collection_id}`);

    }
});

module.exports = addtocollectionPR;