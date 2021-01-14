require('dotenv').config()

module.exports = {
    sendGrid: {
      url: process.env.SENDGRID_URL,
      key: process.env.SENDGRID_KEY
    },
    mailGun: {
      url: process.env.MAILGUN_URL,
      password: process.env.MAILGUN_KEY,
      username: process.env.MAILGUN_USERNAME
    },
    servicesFailoverOrder: [
      'sendgrid',
      'mailgun'
    ],
  };