const sendGrid = require("../../lib/sendGrid");
const failAllServices = require("../../templates/failAllServices");
const passAll = require("../../templates/passAll");
const failSendGrid = require("../../templates/failSendGrid");

describe("Test send using sendGrid service", () => {
    it('test failed email send in sendgrid', async () => {
        await expect(sendGrid.send(failAllServices)).rejects.toThrow("Data format error No TO email address passed in");
    });

    it('test success email send in sendgrid', async () => {
        await expect(sendGrid.send(passAll)).resolves.toEqual("");
    });

    it('test failed due to sender email mismatch in sendgrid', async () => {
        await expect(sendGrid.send(failSendGrid)).rejects.toEqual("The from address does not match a verified Sender Identity. Mail cannot be sent until this error is resolved. Visit https://sendgrid.com/docs/for-developers/sending-email/sender-identity/ to see the Sender Identity requirements");
    });
});