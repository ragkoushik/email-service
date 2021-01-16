'use strict';
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sendEmail = require('./lib/emailSender');
const validation = require("./lib/validation");
const config = require("./config");

//configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.redirect("https://github.com/ragkoushik/email-service#readme");
})

/**
 *  
 * @param {object} body email contents in the request body
 * @return {object} message success or failure
 * 
 */
app.post('/api/send', (request, response) => {
    const validate = validation.validateRequestBody(request.body, config);
    if(validate.valid){
        sendEmail.send(request.body, config)
        .then((data) => {
            response.json(data);
        })
        .catch((err) => {
            response.status(err.statusCode);
            response.json(err);
        })
    } else {
        // if error is an object its an error in the data format caught internally
        response.json({
            message: validate.error,
            statusCode: 400,
            status: "Failed"
        });
    }
    
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Email service listening at http://localhost:${process.env.APP_PORT}`)
})

// mailGun.send(template1);
