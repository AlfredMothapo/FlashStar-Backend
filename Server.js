const express = require('express')
const firebase = require('firebase')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()

var app = express()

app.get("/",(req,res)=>{
    res.send("Hello world");
})

app.listen(8000, () => {
    console.log("Server started at localhost 8000")
})