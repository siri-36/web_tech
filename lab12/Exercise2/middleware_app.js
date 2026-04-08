const express = require('express');
const app = express();
const PORT = 3000;

const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.url;
    
    console.log(`[${timestamp}] ${method} request to: ${url}`);
    next();
};

app.use(requestLogger);

const authShield = (req, res, next) => {
    const isAdmin = req.query.admin === 'true';
    if (isAdmin) {
        console.log("Access Granted: Admin detected.");
        next();
    } else {
        console.log("Access Denied: Not an admin.");
        res.status(403).send('Forbidden: You do not have admin privileges.');
    }
};

app.get('/dashboard', authShield, (req, res) => {
    res.send('Welcome to the Secret Admin Dashboard!');
});

app.get('/public', (req, res) => {
    res.send('This is a public page. Anyone can see this.');
});

app.get('/', (req, res) => {
    res.send('Node.js Middleware Demo. Try /public or /dashboard?admin=true');
});

app.listen(PORT, () => {
    console.log(`Middleware demo running at http://localhost:${PORT}`);
});