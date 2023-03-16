const express = require(`express`);
const signinR = express.Router();

signinR.get("/signin", function (req, res) {
    res.render("signin");
});

module.exports = signinR;