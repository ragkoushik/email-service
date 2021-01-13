'use strict';
const sendGrid = require('./lib/sendgrid')

const template1 = require('./templates/template1');

sendGrid.send(template1);
