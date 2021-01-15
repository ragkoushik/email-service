const validation = require("../../lib/validation");
const config = require("../../config");
const failAllServices = require("../../templates/failAllServices")
const passAll = require("../../templates/passAll")

describe("Test validateRequestBody", () => {
    it("should return valid false ", () => {
        expect(validation.validateRequestBody(failAllServices, config).valid).toEqual(false);
    });

    it("should return valid true", () => {
        expect(validation.validateRequestBody(passAll, config).valid).toEqual(true);
    });
});

describe("Test validateEmail", () => {
    it("should return valid false ", () => {
        const email = 'test';
        expect(validation.validateEmail(email)).toEqual(false);
    });

    it("should return valid true ", () => {
        const email = 'test@test.com';
        expect(validation.validateEmail(email)).toEqual(true);
    });
});