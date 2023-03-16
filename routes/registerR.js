const express = require(`express`);
const registerR = express.Router();


registerR.get("/register", function (req, res) {
    res.render("register");
});

module.exports = registerR;