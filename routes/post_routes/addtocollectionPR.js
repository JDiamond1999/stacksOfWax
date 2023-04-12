const express = require(`express`);
const addtocollectionPR = express.Router();
const connection = require(`../../middleware/db`);
const viewcollectionR = require("../viewcollectionR");


addtocollectionPR.post("/addtocollection", (req, res) => {

    let record_id = req.body.record;
    let collection_id = req.query.collectionid;
    let sessionobj = req.session;
    let userid = sessionobj.authen;


    let addtocollection =

        `INSERT INTO collection_record
        (collection_id, record_id)
        VALUES(?, ?);`

    connection.query(addtocollection, [collection_id, record_id], (err, rows) => {
        if (err) throw err;
    });

    res.redirect(`managecollectionsR`);

});


module.exports = addtocollectionPR;