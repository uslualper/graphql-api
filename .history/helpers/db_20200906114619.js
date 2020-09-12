const mongoose = require('mongoose');
//mongodb://localhost/
module.export = () =>{
    mongoose.connect('mongodb://localhost/');
}