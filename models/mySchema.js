/* send data to db #3 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
    first: String,
    last: String,
    phone: String,
    email: String,
    country: String,
    gender: String,
});


// Create a model based on that schema
const User = mongoose.model("customer", articleSchema);


// export the model
module.exports = User;