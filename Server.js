const express = require('express')
const firebase = require('firebase')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json()
var app = express();
const Rehive = require("rehive")
var rehive = null;
// var config = {
//     apiVersion: 3,
//     apiToken: "d2871f66fbca5053cc31e21482d9614762a60f593f3ec472534883d30e8ef207"
// }
// const rehive = new Rehive(config);

app.post("/register", jsonParser, (req, res) => {

    rehive = new Rehive({ apiVersion: 3 });

    rehive.auth.register({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        company: "1dod1",
        password1: req.body.password1,
        password2: req.body.password2,
        terms_and_conditions: true
    }).then((result) => {
        //create a lifetime token
        rehive.auth.tokens.create({
            password: req.body.password1
        }).then(function (token) {
            res.send(token);
        }, function (err) {
            res.send(err);
        })
    }, (error) => {
        console.log("Error :" + JSON.stringify(error))
        res.send(JSON.stringify(error))
    })
});
app.post("/flash", jsonParser, (req, res) => {
    var config = {
        apiVersion: 3,
        apiToken: req.headers.token
    }
    rehive = new Rehive(config); //init rehive with this user's config.

    rehive.transactions.createTransfer(
        {
            amount: req.body.amount,
            recipient: req.body.recipient,
            currency: req.body.currency
        }).then(function (response) {
            res.send(response)
        }, function (err) {
            res.send(err)
        })
});
app.post("/topUp", jsonParser, (req, res) => { //returns a token that doesn't expire
    var config = {
        apiVersion: 3,
        apiToken: req.headers.token
    }
    rehive = new Rehive(config); //init rehive with this user's config.

    rehive.transactions.createCredit({
        amount: req.body.amount,
        currency: req.body.currency
    }).then(function (response) {
        res.send(response);
    }, function (err) {
        res.send(err);
    })
});
app.post("/login", jsonParser, (req, res) => {
    rehive = new Rehive({ apiVersion: 3 })
    rehive.auth.login({
        user: req.body.email,
        company: "1dod1",
        password: req.body.password
    }).then(function (user) {
        res.send(user)
    }, function (err) {
        res.send(err)
    })
})
app.listen(8000, () => {
    console.log("Server started at localhost 8000")
})