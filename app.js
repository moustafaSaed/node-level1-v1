const express = require('express')
const app = express()
const port = 4000
const mongoose = require('mongoose');
app.get('/', (req, res) => {
    res.sendFile("./views/home.html", { root: __dirname });
})

mongoose.connect('mongodb+srv://mostafasaed060:NKWmN9zuPy3X9d1y@mouscluster.w66om3n.mongodb.net/all-data?retryWrites=true&w=majority&appName=mousCluster').then(() => { // do if connect success
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    })
}).catch((err) => { // do if that's an error occur
    console.log('ErrMous : ' + err);
})