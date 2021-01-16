const sendEmail = require("../../lib/emailSender");
const failAllServices = require("../../templates/failAllServices");
const passAll = require("../../templates/passAll");
const failSendGrid = require("../../templates/failSendGrid");
const config = require("../../config");

describe("Test failover", () => {
    it("test failed email send in both services", async () => {
        const failedResponse = {
            "message": "Error: Data format error No TO email address passed in", 
            "statusCode": 400
        };
        await expect(sendEmail.send(failAllServices, config)).rejects.toEqual(failedResponse);
    });

    it("test success email send in sendgrid", async () => {
        const successResponse = {
            "message": "Sent from sendgrid", 
            "serviceResponse": "", 
            "status": "Success", 
            "statusCode": 200
        };
        await expect(sendEmail.send(passAll, config)).resolves.toEqual(successResponse);
    });

    it("test failed due to sender email mismatch in sendgrid and send using mailgun", async () => {
        await expect(sendEmail.send(failSendGrid, config)).resolves.toEqual(expect.objectContaining({
            "message": "Sent from mailgun",
            "serviceResponse": expect.any(Object),
            "status": "Success",
            "statusCode": 200
          }));
    });
});