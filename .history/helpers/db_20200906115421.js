const mongoose = require('mongoose');

//mongodb://localhost/

module.exports = () => {
    mongoose.connect('mongodb://localhost/');
    mongoose.connect.on('open',()=>{
        console.log('Mongodb connected');
    });
    mongoose.connect.on('error',err=>{
        console.log(err);
    });
}