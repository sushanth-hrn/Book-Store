const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const schema = require('./schema/schema');

mongoose.connect("mongodb+srv://Sushanth:Sushanth9019854934@realmcluster.yrvyx.mongodb.net/books?retryWrites=true&w=majority");
mongoose.connection.once('open',() => {
    console.log("Connected to mlab");
});

const app = express();

app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000,() => {
    console.log('Server listening at port 4000');
});


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://Sushanth:<password>@realmcluster.yrvyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
