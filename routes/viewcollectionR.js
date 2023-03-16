const express = require(`express`);
const viewcollectionR = express.Router();


viewcollectionR.get("/viewcollection", function (req, res) {
    res.render("viewcollection");
});

module.exports = viewcollectionR;