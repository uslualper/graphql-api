const express = require('express');
const expressGraphql = require('express-graphql').graphqlHTTP;

const schema = require('./schema/schema');

const app = express();  
//db
const db = require('helpers/db')();    

app.use('/graphql',expressGraphql({
schema:schema,
graphiql:true
}));
app.listen(5000,()=>{
    console.log("server is running.. :5000");
});

