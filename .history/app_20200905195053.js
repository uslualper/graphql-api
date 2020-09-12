const express = require('express');
const expressGraphql = require('express-graphql').graphqlHTTP;

const schema = require('./schema/schema');

const app = express();      

app.use('/graphql',expressGraphql({
schema:schema
}));
app.listen(5000,()=>{
    console.log("server is running.. :5000");
});

