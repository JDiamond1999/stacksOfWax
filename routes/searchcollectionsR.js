const express = require(`express`);
const searchcollectionsR = express.Router();
const connection = require(`../middleware/db`);

searchcollectionsR.get("/searchcollections", function (req, res) {
  let sessionobj = req.session;
  let userid = sessionobj.authen;

  // chris says dont use select * from as it increases loading time/dont need resources
  let readcollections = 
  
            `SELECT collection_id, collection_image, collection_name, username, collection_likes, rating_average 
            FROM collection
            INNER JOIN user
            ON collection.user_id = user.user_id;
            
            SELECT username
            FROM user
            WHERE user.user_id = ?;`;

  connection.query(readcollections,[userid], (err, rows) => {
    if (err) throw err;
    let rowdata = rows[0];
    let userdata = rows[1];

    res.render("searchcollections", { rowdata, userdata });
  });
});

module.exports = searchcollectionsR;
