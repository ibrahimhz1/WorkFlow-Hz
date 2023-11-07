require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const { logger } = require('./middlewares/logEvents');
const credentials = require('./middlewares/credentials');
const errorMiddleware = require('./middlewares/error');

// PORT
const PORT = process.env.PORT || 3500;

// CORS options
const corsOptions = require('./configs/corsOptions');

// middlewares
app.use(logger);
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/root'));

// routes imports
const admin = require('./routes/api/adminRoutes');     // 
const org = require('./routes/api/organisationRoute'); // ✅
const project = require('./routes/api/projectRoutes'); // ✅
const team = require('./routes/api/teamRoutes');       // ✅
const task = require('./routes/api/taskRoutes');       // ✅
const label = require('./routes/api/labelRoutes');     // ✅
const user = require('./routes/api/userRoutes');       // ✅
// read
// api routes
app.use('/api', admin);
app.use('/api', org);
app.use('/api', project);
app.use('/api', team);
app.use('/api', task);
app.use('/api', label);
app.use('/api', user);

// 404 routes
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: "404 not found" });
    } else {
        res.type('txt').send("404 not found");
    }
});

// error handler
app.use(errorMiddleware)

// database connection
const connectDatabase = require('./configs/dbConfig');
connectDatabase();

app.listen(PORT, () => {
    console.log(`Server running on : http://localhost:${PORT}`);
});
