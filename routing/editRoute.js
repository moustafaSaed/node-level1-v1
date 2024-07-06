const express = require('express')
const router = express.Router()
const moment = require('moment'); // require
const User = require("../models/mySchema") // my DataBase
// var methodOverride = require('method-override') // for delete an item from db DEL


// GET REQUEST
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then((result) => {
            // result in only an object
            console.log("-----------------------------------");
            console.log(result);
            res.render("user/edit", { myTitle: 'Mous | edit', resObj: result, });
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )
})

// PUT(UPDATE) REQUEST
router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
        .then((result) => {
            res.redirect('/success');
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )
})

// DELETE REQUEST
router.delete('/:id', (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => {
            console.log('deleted successfully  ..');
            res.redirect('/');
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )
}
)


module.exports = router