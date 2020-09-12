const mongoose = require('mongoose');

//mongodb://localhost/

module.exports = () => {
    mongoose.connection('mongodb://localhost/');

    mongoose.connection.on('open',()=>{
        console.log('Mongodb connected');
    });
    mongoose.connection.on('error',err=>{
        console.log(err);
    });
}