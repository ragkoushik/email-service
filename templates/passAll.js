require('dotenv').config()

module.exports = {
    from: process.env.EMAIL_FROM,
    to: 'ragkoushikp42@gmail.com',
    subject: "Pass template",
    type: "text/plain",
    body: "This is a sample template that works in both services",
};