const mailGun = require("../../lib/mailGun");
const failAllServices = require("../../templates/failAllServices");
const passAll = require("../../templates/passAll");
const failSendGrid = require("../../templates/failSendGrid");

describe("Test send using mailgun service", () => {
    it('test failed email send in mailGun', async () => {
        await expect(mailGun.send(failAllServices)).rejects.toThrow("Data format error No TO email address passed in");
    });

    it('test success email send in mailGun', async () => {
        await expect(mailGun.send(passAll)).resolves.toEqual(expect.objectContaining({
            "id": expect.any(String),
            "message": "Queued. Thank you."
        }));

    });
});