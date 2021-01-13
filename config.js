require('dotenv').config()

module.exports = {
    sendGrid: {
      url: process.env.SENDGRID_URL,
      key: process.env.SENDGRID_KEY
    }
  };