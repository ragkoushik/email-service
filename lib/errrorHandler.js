const raiseError = (errorMessage)  => {
    throw Error(`Data format error ${errorMessage}`);
}

module.exports = raiseError;