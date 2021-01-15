'use strict';
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sendEmail = require('./lib/emailSender');
const { request, response } = require('express');

//configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.send('Email service app!!')
})

/**
 *  
 * @param {object} body email contents in the request body
 * @return {object} message success or failure
 * 
 */
app.post('/api/send', (request, response) => {
    sendEmail.send(request.body)
        .then((data) => {
            response.json(data);
        })
        .catch((err) => {
            response.status(err.statusCode);
            response.json(err);
        })
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Email service listening at http://localhost:${process.env.APP_PORT}`)
})

// mailGun.send(template1);
