const express = require('express')
const router = express.Router()
const moment = require('moment'); // require
const User = require("../models/mySchema") // my DataBase
// var methodOverride = require('method-override') // for delete an item from db DEL


router.get('/', (req, res) => {
    User.find() // get data from User
        .then((result) => { // if get data success
            // result : array of objects
            res.render("home", { myTitle: 'Mous | Home', resArr: result, moment: moment });
        }
        )
        .catch((err) => { // if error
            console.log(err);
        }
        )
})
router.post('/search', (req, res) => {
    const searchText = req.body.searchText.trim();
    User.find({ $or: [{ first: searchText }, { last: searchText }] }) // get data from User
        .then((result) => { // if get data success
            // result : array of objects

            res.render("user/search", { myTitle: 'Mous | Search', resArr: result, moment: moment, searchText: searchText });
        }
        )
        .catch((err) => { // if error
            console.log(err);
        }
        )
})
router.get('/success', (req, res) => {
    res.render("success", { myTitle: 'Mous | success' });
})
router.get('/view/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            // result in only an object
            console.log("-----------------------------------");
            console.log(result);
            res.render("user/view", { myTitle: 'Mous | view', resObj: result, moment: moment, });
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )
})


module.exports = router