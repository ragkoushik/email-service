const serviceSendgrid = require("./sendGrid")
const serviceMailgun = require("./mailGun")
// const template1 = require("./templates/template1");
const config = require("../config");

const servicesInstances = {
    sendgrid: serviceSendgrid,
    mailgun: serviceMailgun
};

/**
 *
 * @param serviceName
 * @param data
 * @returns {Promise}
 * @private
 */
const sendViaService = (serviceName, data) => {
    return new Promise((resolve,reject) => {
        console.log(`Sending via ${serviceName}...`);
        servicesInstances[serviceName].send(data)
            .then((s)=>{
                console.log("Emails was successfully sent");
                resolve(s)
            })
            .catch((e)=>{
                reject(e)
            });
    });
}

/**
 * Send a email through the send mail service
 *
 * @param email
 * @returns {Promise}
 * @public
 */
const send = (email) => {
    // this.validateSendData(data);
    let serviceIndex = 0;
    return new Promise((resolve,reject)=> {
        // TODO extend to retry a few times
        const failOverHandler = (e) =>{
            serviceIndex++
            console.log(`Failover:: serviceIndex: ${serviceIndex}, error: ${e.message}`);
            console.log(serviceIndex, config.servicesFailoverOrder.length)
            if (serviceIndex < config.servicesFailoverOrder.length ){
                sendViaService(config.servicesFailoverOrder[serviceIndex], email)
                    .then((data) => {
                        resolve({
                            status: "Success",
                            message: `Sent from ${config.servicesFailoverOrder[serviceIndex]}`,
                            serviceResponse: data
                        })
                    })
                    .catch(failOverHandler)
            }
            else {
                reject({
                    status: "Failed",
                    message: "The message was not sent, all the send mail services are unavailable",
                    statusCode: 503
                });
            }
        };

        sendViaService(config.servicesFailoverOrder[serviceIndex], email)
            .then((data) => {
                resolve({
                    status: "Success",
                    message: `Sent from ${config.servicesFailoverOrder[serviceIndex]}`,
                    serviceResponse: data,
                    statusCode: 200
                })
            })
            .catch((err) => {
                // if error is an object its an error in the data format caught internally
                if(typeof err === "object") {
                    reject({
                        message: err.toString(),
                        statusCode: 400
                    });
                } else {
                    failOverHandler(err);
                }
            })
    });
}

module.exports = {
    send
};