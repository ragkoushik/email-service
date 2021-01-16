require('dotenv').config()

module.exports = {
    from: 'ragkoushikp42@gmail.com',
    to: 'ragkoushik@gmail.com',
    subject: "Fail Sendgrid / Pass MailGun template",
    type: "text/plain",
    body: "This is a sample template that fails in sendgrid but works in mailgun",
};