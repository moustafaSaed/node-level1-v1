const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose');
const User = require("./models/mySchema") // my DataBase

app.set('view engine', 'ejs') // to be able to write js with html
app.use(express.urlencoded({ extended: true })); // send data to db #2
app.use(express.static('public')) // to create public file to put css/js/images in it

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
            res.render("home", { myTitle: 'Mous | Home', resArr: result});
        }
        )
        .catch((err) => { // if error
            console.log(err);
        }
        )
})
app.get('/add', (req, res) => {
    res.render("add", { myTitle: 'Mous | add' });
})
app.get('/edit', (req, res) => {
    res.render("edit", { myTitle: 'Mous | edit' });
})
app.get('/view', (req, res) => {
    res.render("view", { myTitle: 'Mous | view' });
})
app.get('/success', (req, res) => {
    res.render("success", { myTitle: 'Mous | success' });
})

mongoose.connect('mongodb+srv://mostafasaed060:NKWmN9zuPy3X9d1y@mouscluster.w66om3n.mongodb.net/all-data?retryWrites=true&w=majority&appName=mousCluster').then(() => { // do if connect success
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    })
}).catch((err) => { // do if that's an error occur
    console.log('ErrMous : ' + err);
})

app.post('/add', (req, res) => {
    const user = new User(req.body); // save data in variable to save in db
    console.log('req.body :: ' + req.body);
    user
        .save() // data saved in db
        .then(result => { // do if success
            console.log("saved successfuly");
            res.redirect("/success");
        })
        .catch(err => { // do if error
            console.log(err);
        });
})