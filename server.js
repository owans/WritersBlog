const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const WriterRoute = require('./route/writerRoute');
const ArticleRoute = require('./route/articleRoute');
const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost:27017/levelup-mongodb').then(()=>{
    console.log('Succesfully connected to mongodb');
}).catch((err)=>{
    console.log('An error occurred while trying to connect to the db', err);
})

app.use(cors());

//add middlewares for passing json and url encoded and populate req.body
app.use(express.urlencoded({extended: false}));

app.use(express.json());


app.use('/writer', WriterRoute);
app.use('/article', ArticleRoute);

app.listen(2004).on('listening', () =>{
    console.log('💘 app is listening on 2004');
})