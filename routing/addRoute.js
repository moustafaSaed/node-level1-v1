const express = require('express')
const router = express.Router()
const moment = require('moment'); // require
const User = require("../models/mySchema") // my DataBase
// var methodOverride = require('method-override') // for delete an item from db DEL




// GET REQUEST
router.get('/user/add', (req, res) => {
    res.render("user/add", { myTitle: 'Mous | add' });
})

// POST REQUEST
router.post('/add', (req, res) => {
    User
        .create(req.body) // data saved in db
        .then(result => { // do if success
            console.log("saved successfuly");
            res.redirect("/success");
        })
        .catch(err => { // do if error
            console.log(err);
        });
})

module.exports = router