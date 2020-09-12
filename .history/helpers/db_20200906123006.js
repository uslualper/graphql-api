const mongoose = require('mongoose');

//mongodb://localhost/

module.exports = () => {
    mongoose.connect(process.env.MONGO_DB_CONNECTIN_STRING);

    mongoose.connection.on('open',()=>{
        console.log('Mongodb connected');
    });
    mongoose.connection.on('error',err=>{
        console.log(err);
    });
}