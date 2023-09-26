const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { logger } = require('./middlewares/logEvents');
const credentials = require('./middlewares/credentials');
const errorHandler = require('./middlewares/errorHandler');

// PORT
const PORT = process.env.PORT || 3500;

// CORS options
const corsOptions = require('./configs/corsOptions');

// middlewares
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/root'));

// api routes
app.use('/api/employees', require('./routes/api/employeesRoute'));

app.all('*', (req, res)=> {
    res.status(404);
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    }else if(req.accepts('json')){
        res.json({message: "404 not found"});
    }else{
        res.type('txt').send("404 not found");
    }
});

// error handler
app.use(errorHandler)

app.listen(PORT, ()=> {
    console.log(`Server running on : http://localhost:${PORT}`);
});