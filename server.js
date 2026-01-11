require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mysql = require('mysql2/promise');
const path = require('path');
const helmet = require('helmet');
const crypto = require('crypto');

const config = require('./config');
const verifyToken = require('./middlewares/verifyToken'); // Ensure this middleware exists
const { sequelize } = require('./models/index');

// Init Express & MySQL pool
const app = express();
const pool = mysql.createPool(config.pool);

/* ------------------------------------------------------------------
   GLOBAL MIDDLEWARES
------------------------------------------------------------------- */

// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Generate a unique nonce for CSP on each request
app.use((req, res, next) => {
    res.locals.nonce = crypto.randomBytes(16).toString('base64');
    console.log(`Generated nonce: ${res.locals.nonce}`);
    next();
});

// Helmet security configuration + dynamic nonce support
app.use(
    helmet({
        contentSecurityPolicy: {
            useDefaults: true,
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://apis.google.com",
                    (req, res) => `'nonce-${res.locals.nonce}'`,
                ],
                scriptSrcAttr: ["'unsafe-inline'"],
                styleSrc: [
                    "'self'",
                    "'unsafe-inline'",
                    "https://fonts.googleapis.com",
                    "https://cdnjs.cloudflare.com",
                ],
                fontSrc: [
                    "'self'",
                    "https://fonts.gstatic.com",
                    "https://cdnjs.cloudflare.com",
                ],
                imgSrc: [
                    "'self'",
                    "data:",
                    "https://*.giphy.com",
                    "https://books.google.com",
                ],
                connectSrc: [
                    "'self'",
                    "https://api.giphy.com",
                    "https://www.googleapis.com",
                ],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);

// Logging middleware
app.use(morgan('dev'));

// CORS configuration
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-Type, Authorization'
    );

    if (req.method === 'OPTIONS') return res.sendStatus(200);
    next();
});

/* ------------------------------------------------------------------
   ROUTE LOADER HELPER
------------------------------------------------------------------- */

function loadRoute(pathStr, routerName, args = []) {
    try {
        const routerModule = require(pathStr);
        const router = routerModule(express, ...args);
        app.use(`/api/${routerName}`, router);
        console.log(`Loaded route: /api/${routerName}`);
    } catch (err) {
        console.error(`Error loading ${routerName} route:`, err);
    }
}

/* ------------------------------------------------------------------
   API ROUTES
------------------------------------------------------------------- */

// Auth & User Basic Routes
loadRoute('./routes/authenticate', 'authenticate');
loadRoute('./routes/users', 'users');

// Routes with MySQL pool
loadRoute('./routes/books', 'books', [pool]);
loadRoute('./routes/comments', 'comments', [pool]);
loadRoute('./routes/likes', 'likes', [pool]);
loadRoute('./routes/user_book', 'user_book', [pool]);
loadRoute('./routes/lists_book', 'lists_book', [pool]);
loadRoute('./routes/lists', 'lists', [pool]);
loadRoute('./routes/reviews', 'reviews', [pool]);
loadRoute('./routes/followings', 'followings', [pool]);
loadRoute('./routes/userRoles', 'user-roles', [pool]);

// Simple express-only routes
loadRoute('./routes/search', 'search');
loadRoute('./routes/status', 'status');

/* ------------------------------------------------------------------
   FRONTEND DELIVERY (Angular/React/Vue/etc)
------------------------------------------------------------------- */

// Serve static SPA files
app.use(express.static(path.join(__dirname, 'public/app')));

// All other routes → send SPA index.html with CSP header
app.get('*', (req, res) => {
    const cspHeader = `
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://apis.google.com 'nonce-${res.locals.nonce}';
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' https://fonts.gstatic.com;
        img-src 'self' data: https://*.giphy.com;
        connect-src 'self' https://api.giphy.com;
        object-src 'none';
        upgrade-insecure-requests;
    `.replace(/\s+/g, ' '); // Clean whitespace

    console.log(`Setting CSP header: ${cspHeader}`);

    res.sendFile(path.join(__dirname, 'public/app/index.html'), {
        headers: {
            'Content-Security-Policy': cspHeader,
        },
    });
});

/* ------------------------------------------------------------------
   START SERVER
------------------------------------------------------------------- */

app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
});
