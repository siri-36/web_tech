const http = require('http');

const PORT = 3000;
const HOST = 'localhost';

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    console.log(`Received ${req.method} request for: ${req.url}`);

    if (req.url === '/') {
        res.statusCode = 200;
        res.write('<h1>Welcome to my Node.js Server!</h1>');
        res.write('<p>This response was sent without using any frameworks.</p>');
    } else if (req.url === '/about') {
        res.statusCode = 200;
        res.write('<h1>About Page</h1>');
        res.write('<p>This is a simple Node.js demonstration.</p>');
    } else {
        res.statusCode = 404;
        res.write('<h1>404 Not Found</h1>');
    }

    res.end();
});

server.listen(PORT, HOST, () => {
    console.log('-------------------------------------------');
    console.log(`Server is running at http://${HOST}:${PORT}`);
    console.log('-------------------------------------------');
});