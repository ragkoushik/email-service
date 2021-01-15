/**
 * validates email address string and returns valid true / false
 * @param {String} email email address sting
 * @return {object} 
 * @public
 */

const validateEmail = (email)  => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/**
 * validates body of the request and returns valid true /false
 * @param {object} email email 
 * @param {object} config config 
 * @return {object} 
 * @public
 */
const validateRequestBody = (email, config)  => {
    let valid = true;
    let error = 'Missing the following fields in the request body ';
    config.mandatoryFields.forEach(field => {
        if (!email.hasOwnProperty(field)) {
            valid = false;
            error += "[" + field + "],";
        }
    });
    
    if(!valid){
        error = error.substring(0, error.length - 1);
    }

    return {
        valid,
        error
    }
}


module.exports = {
    validateEmail,
    validateRequestBody
};