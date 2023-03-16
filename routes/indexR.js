const express = require(`express`);
const indexR = express.Router();


indexR.get("/", function (req, res) {

    try {
        res.render("index");
    } catch (err) {
        next(err);
    }

});

module.exports = indexR;