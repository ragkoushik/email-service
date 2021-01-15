# email-service
The application provides an abstraction between Mailgun and SendGrid email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.

# DEMO APP
The app is running on a AWS EC2 instance - http://ec2-3-26-39-15.ap-southeast-2.compute.amazonaws.com with two endpoints
- GET endpoint to send simple app response
    http://ec2-3-26-39-15.ap-southeast-2.compute.amazonaws.com
    
    Root URL that responds with the app name

- POST endpoint to end emails vis Mailgun and SendGrid
    http://ec2-3-26-39-15.ap-southeast-2.compute.amazonaws.com/api/send

   @param {object} body email contents in the request body 

   *Example*

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

# TODO
- Retry sending if both services fail
- UI to setup email Recipients, Subject and Body
- API documentation
- Containerize and setup CI/CD pipeline
- Support for HTML email templates and attachments

