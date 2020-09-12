const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const movie = new Schema({
    title: String,
    description: String,
    year: Number,
    directorId:String
});