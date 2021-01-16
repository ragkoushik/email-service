# Email Service
The application provides an abstraction between Mailgun and SendGrid email service providers. If one of the services goes down, the other takes over.

## Limitations
- SendGrid - From address should be the email address used at the time of registering.
- Mailgun - This app currently implements a sandbox domain, recipent emails would have to be preauthorised for API keys. Hence I have SendGrid as the primary service.

## DEMO APP
The app is running on a AWS EC2 instance - http://ec2-3-26-39-15.ap-southeast-2.compute.amazonaws.com with two endpoints
- GET endpoint to send simple app response
    http://ec2-3-26-39-15.ap-southeast-2.compute.amazonaws.com
    
    Root URL that redirects to GitHub project page

- POST endpoint to end emails vis Mailgun and SendGrid
    http://ec2-3-26-39-15.ap-southeast-2.compute.amazonaws.com/api/send

   @param {object} body email contents in the request body 

   *Example* - Some more sample data can be found in templates folder

   ```json
    {
        "from": "<Email Address>",
        "to": "<Email Address>",
        "cc": "<Email Address>",
        "bcc": "<Email Address>",
        "subject": "<Subject>",
        "body": "<Email body>"
    }
   ```
   @retuns {object} JSON response with transaction details
   
   *Example*
   
    ```json
    {
        "status": "Success / failed",
        "message": "If success, the service the message was sent from",
        "serviceResponse": "Response from email service",
        "statusCode": "Status Code"
    }
    ```
## Tech Stack
- Node
- Express
- PM2
- Hosted on AWS EC2 instance
- Postman collection attached for testing, scenarios:
    - Send Endpoint - Fail both
    - Send Endpoint Via MainGun - failover
    - Send Endpoint Via SendGrid
    
## Environment setup
Create a .env file with the following properties
```
APP_PORT = 3000

EMAIL_FROM = example@email.com

SENDGRID_URL = https://api.sendgrid.com/v3/mail/send
SENDGRID_KEY = 

MAILGUN_USERNAME = api
MAILGUN_KEY = 
MAILGUN_URL = "https://api.mailgun.net/v3/sandbox5ebc4f1d3c774f389fad1d1a8dbd8b9d.mailgun.org/messages"
```
## Run
### Unit tests
`npm run test:unit`
### Integration tests
`npm run test:integration`
### App - runs on port 3000
`node index.js`

## TODO
- Retry sending if both services fail
- UI to setup email Recipients, Subject and Body
- API documentation
- Containerize and setup CI/CD pipeline
- Support for HTML email templates and attachments
- Route traffic on https

