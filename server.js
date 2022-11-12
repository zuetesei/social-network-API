const express = require('express');
const db = require('./config/connection');
// const userRoutes = require('./routes/api/userRoutes');


const app = express();
const PORT = process.env.PORT || 3000;


db.once('open', () => {
    app.listen(3000, function () {
        console.log('Now listening on 3000!')
    })
});