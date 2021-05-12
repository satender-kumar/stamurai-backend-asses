const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./config/dbConfig');
const router = require('./routes/index');

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({ type: 'application/json', limit: '50mb' }));

dbConnection.dbConnect();

app.get('/', (req, res) => {
    res.send('Welcome to Stamurai.');
});

app.use(router);

app.listen(8080, () => {
    console.log('Everything looks good.');
});
