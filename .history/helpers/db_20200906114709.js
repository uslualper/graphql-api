const mongoose = require('mongoose');
//mongodb://localhost/
module.export = () =>{
    mongoose.connect('mongodb://localhost/');
    mongoose.connect.on('open',()=>{
        console.log('Mongodb connected');
    });
}