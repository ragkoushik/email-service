require('dotenv').config()

module.exports = {
    from: process.env.EMAIL_FROM,
    to: "ragkoushikp42@gmail.com, ragkoushik@gmail.com",  
    // cc: "ragkoushik@gmail.com",
    // bcc: "ragkoushik@gmail.com",
    subject: "Template 1",
    type: "text/plain",
    body: "This is a sample template-1",
};