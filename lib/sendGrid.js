const axios = require("axios");
const config = require("../config").sendGrid;
const validate = require("./validation");
const raiseError = require("./errrorHandler");

/**
 * creates an array of objects distribution list 
 * @param {Array} list list of email addresses
 * @return {Array} formattedList  array of objects
 * @private
 */
const buildDistributionList = (list) => {
    return list.map(item => mappedEmailAddress(item));
}

/**
 * validates email address string and converts a string to an object structure
 * @param {String} item email header and body
 * @return {object} 
 * @private
 */
const mappedEmailAddress = (item) => {
    const emailValid = validate.validateEmail(item.trim());
    if(emailValid){
        return {
            email: item.trim(),
        };
    } else {
        raiseError(`Invalid email address found ${item}`);
    }
}

/**
 * modelEmailData assists with pannel beating email object to suit 
 * SendGrid's required data structure
 * @param {object} email email header and body
 * @return {object} emailBody in SendGrid's required data structure
 * @private
 */
const modelEmailData = (email) => {
    return {
        personalizations: [
            {
                to: email.to ? buildDistributionList(email.to.split(",")) : raiseError("No TO email address passed in"),
                cc: email.cc ? buildDistributionList(email.cc.split(",")) : null,
                bcc: email.bcc ? buildDistributionList(email.bcc.split(",")) : null,
            }
        ],
        from: mappedEmailAddress(email.from),
        subject: email.subject ? email.subject : raiseError("No Subject passed in"),
        content:[
            {
                type: email.type ? email.type : "text/plain",
                value: email.body ? email.body : raiseError("No email body passed")
            }
        ]
    };
}

/**
 * The sendGrid class assists with sending email header and 
 * body to sendgrid gateway
 * @param {object} email email header and body
 * @return {Function} callback when a response arrives from sendGrid
 * @public
 */
const send = (email) => {
    return new Promise((resolve, reject) => {
        const data = modelEmailData(email);

        axios.post(
            config.url, 
            data, 
            {
                'Content-Type': 'application/json',
                headers: {
                    "Authorization": `Bearer ${config.key}`
                }
            }
        ).then((res) => {
            resolve(res.data);
        })
        .catch((res) => {
            if(res.response && res.response.data && res.response.data.errors) {
                reject(res.response.data.errors.map(err => err.message).join(','));
            } else {
                reject("Failed seng grid api call");
            }
        })
    });
}


module.exports = {
    send
};