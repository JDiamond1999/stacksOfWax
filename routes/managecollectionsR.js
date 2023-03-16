const express = require(`express`);
const managecollectionsR = express.Router();


managecollectionsR.get("/managecollections", function (req, res) {
    res.render("managecollections");
});

module.exports = managecollectionsR;