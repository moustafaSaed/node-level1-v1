const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const moment = require('moment'); // require
const User = require("./models/mySchema") // my DataBase
var methodOverride = require('method-override') // for delete an item from db DEL

app.set('view engine', 'ejs') // to be able to write js with html
app.use(express.urlencoded({ extended: true })); // send data to db #2
app.use(express.static('public')) // to create public file to put css/js/images in it
app.use(methodOverride('_method')) // // for delete an item from db DEL

// for liveReload   -- Start
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
        liveReloadServer.refresh("/");
    }, 100);
});
// for liveReload   -- End

app.get('/', (req, res) => {
    User.find() // get data from User
        .then((result) => { // if get data success
            // result : array of objects
            res.render("home", { myTitle: 'Mous | Home', resArr: result, moment:moment});
        }
        )
        .catch((err) => { // if error
            console.log(err);
        }
        )
})
// search
app.post('/search', (req, res) => {
    const searchText = req.body.searchText.trim();
    User.find({$or: [{first: searchText},{last: searchText}]}) // get data from User
        .then((result) => { // if get data success
            // result : array of objects
            
            res.render("user/search", { myTitle: 'Mous | Search', resArr: result, moment:moment , searchText: searchText});
        }
        )
        .catch((err) => { // if error
            console.log(err);
        }
        )
})
app.get('/user/add', (req, res) => {
    res.render("user/add", { myTitle: 'Mous | add' });
})

app.get('/success', (req, res) => {
    res.render("success", { myTitle: 'Mous | success'});
})
// should be the last get 
app.get('/edit/:id', (req, res) => {
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
app.put('/edit/:id', (req, res) => {
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
app.get('/view/:id', (req, res) => {
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
// DELETE REQUEST
app.delete('/edit/:id',(req, res) => {
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
mongoose.connect('mongodb+srv://mostafasaed060:NKWmN9zuPy3X9d1y@mouscluster.w66om3n.mongodb.net/all-data?retryWrites=true&w=majority&appName=mousCluster').then(() => { // do if connect success
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    })
}).catch((err) => { // do if that's an error occur
    console.log('ErrMous : ' + err);
})

app.post('/add', (req, res) => {
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