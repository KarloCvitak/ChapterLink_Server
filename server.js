require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const path = require('path');
const helmet = require('helmet');
const config = require('./config');
const crypto = require('crypto');
const verifyToken = require('./middlewares/verifyToken'); // Ensure verifyToken is correctly required

const app = express();
const pool = mysql.createPool(config.pool);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    console.log(`Generated nonce: ${res.locals.nonce}`);
    next();
});

app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://apis.google.com", (req, res) => `'nonce-${res.locals.nonce}'`],
            scriptSrcAttr: ["'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https://*.giphy.com"],
            connectSrc: ["'self'", "https://api.giphy.com"],
            objectSrc: ["'none'"],
            upgradeInsecureRequests: [],
        },
    },
}));

const { sequelize } = require('./models/index'); // Import sequelize


app.use(morgan('dev'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

///// FIXED ROM ////

// Routes
try {
    const authRouter = require('./routes/authenticate')(express);
    app.use('/api/authenticate', authRouter);
} catch (error) {
    console.error('Error loading authenticate route:', error);
}



try {
    const usersRouter = require('./routes/users')(express);
    app.use('/api/users', usersRouter);
} catch (error) {
    console.error('Error loading users route:', error);




}



try {
    const searchRouter = require('./routes/search')(express);
    app.use('/api/search', searchRouter);
} catch (error) {
    console.error('Error loading followings route:', error);
}



try {
    const statusRouter = require('./routes/status')(express);
    app.use('/api/status', statusRouter);
} catch (error) {
    console.error('Error loading status route:', error);
}


///// NOT FIXED ROM ////




try {
    const commentsRouter = require('./routes/comments')(express, pool);
    app.use('/api/comments', commentsRouter);
} catch (error) {
    console.error('Error loading comments route:', error);
}

try {
    const likesRouter = require('./routes/likes')(express, pool);
    app.use('/api/likes', likesRouter);
} catch (error) {
    console.error('Error loading likes route:', error);
}

try {
    const booksRouter = require('./routes/books')(express, pool);
    app.use('/api/books', booksRouter);
} catch (error) {
    console.error('Error loading books route:', error);
}

try {
    const userBookRouter = require('./routes/user_book')(express, pool);
    app.use('/api/user_book', userBookRouter);
} catch (error) {
    console.error('Error loading user_book route:', error);
}

try {
    const listsBookRouter = require('./routes/lists_book')(express, pool);
    app.use('/api/lists_book', listsBookRouter);
} catch (error) {
    console.error('Error loading lists_book route:', error);
}

try {
    const listsRouter = require('./routes/lists')(express, pool);
    app.use('/api/lists', listsRouter);
} catch (error) {
    console.error('Error loading lists route:', error);
}

try {
    const reviewsRouter = require('./routes/reviews')(express, pool);
    app.use('/api/reviews', reviewsRouter);
} catch (error) {
    console.error('Error loading reviews route:', error);
}

try {
    const followingsRouter = require('./routes/followings')(express, pool);
    app.use('/api/followings', followingsRouter);
} catch (error) {
    console.error('Error loading followings route:', error);
}









/*
app.use(express.static(path.join(__dirname, 'public/app')));

app.get('*', (req, res) => {
    const cspHeader = `default-src 'self'; script-src 'self' 'unsafe-inline' https://apis.google.com 'nonce-${res.locals.nonce}'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.giphy.com; connect-src 'self' https://api.giphy.com; object-src 'none'; upgrade-insecure-requests;`;
    console.log(`Setting CSP header: ${cspHeader}`); // Log the CSP header for debugging
    res.sendFile(path.join(__dirname, 'public/app/index.html'), {
        headers: {
            'Content-Security-Policy': cspHeader
        },
    });
});*/

app.listen(config.port, () => {
    console.log(`Running on port ${config.port}`);
});
