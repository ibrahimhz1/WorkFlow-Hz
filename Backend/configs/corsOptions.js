const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    credentials: true,
    origin: (origin, callback)=> {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }else{
            callback(new Error('Not Allowed by CORS !!!'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;