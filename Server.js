const express = require('express')
const firebase = require('firebase')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
const https = require("https");
var app = express();
const Rehive = require("rehive")

var config = {
    apiVersion: 3,
    apiToken: "7e52601a"
}
const rehive = new Rehive(config);

app.post("/register", jsonParser, (req, res) => {
    rehive.auth.register({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        company: "1dod1",
        password1: req.body.password1,
        password2: req.body.password2,
        terms_and_conditions: true
    }).then((result) => {
        res.send(result)
    }, (error) => {
        console.log("Error :" + JSON.stringify(error))
        res.send(JSON.stringify(error))
    })
});
app.post("/flash", jsonParser, (req, res) => {
    rehive.transactions.createTransfer(
        {
            amount: req.body.amount,
            recipient: req.body.recipient,
        }).then(function (response) {
            res.send(response)
        }, function (err) {
            res.send(err)
        })
});
app.listen(8000, () => {
    console.log("Server started at localhost 8000")
})