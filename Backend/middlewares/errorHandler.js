const { logEvents } = require('./logEvents');

class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message),
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor);
    }
}

// const errorHandler = (err, req, res, next) => {
//     logEvents(`${err.name} : ${err.message}`, 'errLog.txt');
//     console.error(err.stack);
//     res.status(500).send(err.message);
// };

module.exports = ErrorHandler;
