const express = require(`express`);
const addreviewPR = express.Router();
const connection = require(`../../middleware/db`);


addreviewPR.post("/addreview", (req, res) => {

    let sessionobj = req.session;

    let userid = sessionobj.authen;
    let collection_id = req.query.collectionid;
    let review_title = req.body.title;
    let review_desc = req.body.description;
    let star_rating = req.body.rating;


    if (star_rating != `--Star Rating--` || review_title.length == 0 || review_desc.length == 0 ) {

        let addreview =
            `INSERT INTO review 
        (review_id, review_title, star_rating, review_desc, user_id, collection_id) 
        VALUES (NULL, ?, ?, ?, ?, ?);`;

        connection.query(addreview, [review_title, star_rating, review_desc, userid, collection_id], (err, rows) => {
            if (err) throw err;
        });

        res.redirect(`viewOthersCollection?collectionid=${collection_id}`);
    } else {
        res.redirect(`viewOthersCollection?collectionid=${collection_id}`);
    }

});


module.exports = addreviewPR;