const express = require(`express`);
const logoutR = express.Router();
const connection = require(`../middleware/db`);

logoutR.get("/logout", function (req, res) {

    req.session.destroy();

    let userdata = [];

    res.render("index", { userdata });

});

module.exports = logoutR;