const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    const headers = req.headers;
    res.json(headers);
});

app.get('/secure', (req, res) => {
    const headers = req.headers;
    res.json(headers);
});

app.listen(3000, () => console.log('Running on 3000'));