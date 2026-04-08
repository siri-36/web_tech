const fs = require('fs');

const fileName = 'example.txt';

fs.writeFile(fileName, 'Initial content: Hello Node.js!', (err) => {
    if (err) {
        return console.error(`Error: ${err.message}`);
    }
    console.log('File created.');

    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            return console.error(`Error: ${err.message}`);
        }
        console.log(`Content: ${data}`);

        fs.appendFile(fileName, '\nThis is appended text.', (err) => {
            if (err) {
                return console.error(`Error: ${err.message}`);
            }
            console.log('Data appended.');

            fs.readFile(fileName, 'utf8', (err, updatedData) => {
                if (err) return console.error(err);
                console.log(`Updated Content: ${updatedData}`);

                fs.unlink(fileName, (err) => {
                    if (err) {
                        return console.error(`Error: ${err.message}`);
                    }
                    console.log('File deleted.');
                });
            });
        });
    });
});