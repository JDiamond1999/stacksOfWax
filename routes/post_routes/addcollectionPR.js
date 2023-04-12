const express = require(`express`);
const addcollectionPR = express.Router();
const connection = require(`../../middleware/db`);


addcollectionPR.post("/addcollection", (req, res) => {

    let sessionobj = req.session;

    let userid = sessionobj.authen;
    let image_link = req.body.imagelink;
    let title = req.body.title;
    let desc = req.body.description;
    let record_id = req.body.record;



    let insertcollection =
        `INSERT INTO collection
        (collection_id, collection_name, collection_image, collection_desc, collection_likes, user_id)
         VALUES (NULL, ?, ?, ?, 0, ?);

        SET @collectionid = LAST_INSERT_ID();

        INSERT INTO collection_record
        (collection_id, record_id)
        VALUES(@collectionid, ?);`;

    connection.query(
        insertcollection,
        [title, image_link, desc, userid, record_id],
        (err, rows) => {
            if (err) throw err;
        });

    res.render(`managecollections`);

});


module.exports = addcollectionPR;