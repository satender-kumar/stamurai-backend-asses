const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/stamuraiAppDB';

exports.dbConnect = async function () {
    try {
        await mongoose.connect(dbURL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
        console.log('Connected to DB.');
    } catch (error) {
        console.log('DB connection error: ', error);
    }
};
