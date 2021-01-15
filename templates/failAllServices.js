require('dotenv').config()

module.exports = {
    from: process.env.EMAIL_FROM,
    subject: "Template 1",
    type: "text/plain",
    body: "This is a sample template-1",
};