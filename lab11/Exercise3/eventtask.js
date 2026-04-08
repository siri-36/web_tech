const EventEmitter = require('events');

const myEmitter = new EventEmitter();

myEmitter.on('userLogin', (username) => {
    console.log(`Listener 1: ${username} has logged in.`);
});

myEmitter.on('userLogin', (username) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`Listener 2: Login for ${username} logged at ${timestamp}.`);
});

myEmitter.on('dataProcessing', (data) => {
    console.log('Starting asynchronous data processing...');
    setTimeout(() => {
        console.log(`Process Complete: ${data.status}`);
    }, 2000);
});

console.log('--- System Execution Start ---');

myEmitter.emit('userLogin', 'Alice');

myEmitter.emit('dataProcessing', { id: 1, status: 'Success' });

console.log('--- End of Main Script ---');