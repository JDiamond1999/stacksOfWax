const express = require(`express`);
const addcollectionR = express.Router();


addcollectionR.get("/addcollection", function (req, res) {
    res.render("addcollection");
});

module.exports = addcollectionR;