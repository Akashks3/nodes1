const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const directoryPath = path.join(__dirname, 'files');

if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
}

app.get('/', (req, res) => {
    res.end('Welcome to the Files');
});

app.post('/create-file', (req, res) => {
    const timestamp = new Date().toISOString().replace(/:/g, `-`);
    const fileName = `${timestamp}.txt`;

    const filePath = path.join(directoryPath, fileName);

    fs.writeFile(filePath, timestamp, () => {
        res.status(201).json({ message: 'File created', fileName });
    });
});


app.get('/files', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to retrieve files' });
        }
        const textFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(textFiles);
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
