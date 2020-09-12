const mongoose = require('mongoose');
//mongodb://localhost/
module.export = () =>{
    mongoose.connect('mongodb://localhost/');
    mongoose.connect.on('open',()=>{
        console.log('Mongodb connected');
    });
    mongoose.connect.on('error',err=>{
        console.log(err);
    });
}