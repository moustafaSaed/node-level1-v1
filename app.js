const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');
const moment = require('moment'); // require
const User = require("./models/mySchema") // my DataBase
var methodOverride = require('method-override') // for delete an item from db DEL

// calling routes from routing file
const editRoute = require('./routing/editRoute'); // calling the route that i create to use it here
const addRoute = require('./routing/addRoute'); // calling the route that i create to use it here
const otherRoutes = require('./routing/otherRoutes'); // calling the route that i create to use it here


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




//other routes was here repespectively at the pre version

// search
//other routes was here repespectively at the pre version

// add was here in pre version

//other routes was here repespectively at the pre version

// should be the last get 
// edit route was here in the pre version ..

//other routes was here repespectively at the pre version
// edit route was here in the pre version ..
mongoose.connect('mongodb+srv://mostafasaed060:NKWmN9zuPy3X9d1y@mouscluster.w66om3n.mongodb.net/all-data?retryWrites=true&w=majority&appName=mousCluster').then(() => { // do if connect success
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    })
}).catch((err) => { // do if that's an error occur
    console.log('ErrMous : ' + err);
})

// add was here in pre version


app.use('/edit', editRoute)
app.use(addRoute)
app.use(otherRoutes)