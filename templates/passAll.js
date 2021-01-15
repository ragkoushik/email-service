require('dotenv').config()

module.exports = {
    from: process.env.EMAIL_FROM,
    to: 'ragkoushik@gmail.com',
    subject: "Template 1",
    type: "text/plain",
    body: "This is a sample template",
};