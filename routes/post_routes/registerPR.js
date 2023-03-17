const express = require(`express`);
const registerPR = express.Router();
const connection = require(`../../middleware/db`);


registerPR.post("/register", (req, res) => {
    // printing the form data to console as an array
    console.log(req.body);

    // storing the form data as an object
    let userdata = req.body;

    // send data back to home page as a json object
    res.render("index", { sentback: userdata });
});

module.exports = registerPR;