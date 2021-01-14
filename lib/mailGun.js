const axios = require("axios");
const config = require("../config").mailGun;
const validate = require("./validation");
const FormData = require('form-data');
const raiseError = require("./errrorHandler");

/**
 * creates an array of objects distribution list 
 * @param {Array} list list of email addresses
 * @return {Sting} comma seperated list
 * @private
 */
const validateDistributionList = (list) => {
    return list.map(item => mappedEmailAddress(item)).join(', ');
}


/**
 * validates email address string and converts a string to an object structure
 * @param {String} item email header and body
 * @return {object} 
 * @private
 */
const mappedEmailAddress = (item) => {
    const emailValid = validate.validateEmail(item.trim());
    if (emailValid) {
        return item.trim();
    } else {
        raiseError(`Invalid email address found ${item}`);
    }
}

/**
 * modelEmailData creates form data for mailgun gateway
 * @param {object} email email header and body
 * @return {FormData} emailBody in mailgun's required data structure
 * @private
 */
const modelEmailData = (email) => {
    let form = new FormData();

    email.from ? form.append('from', validateDistributionList(email.from.split(","))) : raiseError("No FROM email address passed in");
    email.to ? form.append('to', validateDistributionList(email.to.split(","))) : raiseError("No TO email address passed in");
    email.cc ? form.append('cc', validateDistributionList(email.cc.split(","))) : null;
    email.bcc ? form.append('bcc', validateDistributionList(email.bcc.split(","))) : null;
    email.subject ? form.append('subject', email.subject) : raiseError("No Subject passed in");
    email.body ? form.append('text', email.body) : raiseError("No email body passed");
    
    return form;
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
                headers: { 
                    ...data.getHeaders()
                },
                auth: {
                    username: config.username,
                    password: config.password
                }
            }
        ).then((res) => {
            resolve(res.data);
        })
        .catch((res) => {
            reject(res.response.data.message);
        })
    });
}


module.exports = {
    send
};