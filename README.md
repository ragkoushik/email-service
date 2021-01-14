# email-service
The application provides an abstraction between Mailgun and SendGrid email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.

# TODO
- Retry sending if both services fail
- UI to setup email Recipients, Subject and Body
