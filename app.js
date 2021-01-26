"use strict";
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function (request, res) {
    res.status(200).sendFile('index.html', { root: path.join(__dirname, './dist') });
});

// app.use(express.static(path.join(__dirname, 'static')));
// app.get('/', function (request, res) {
//     res.status(200).sendFile('indexOld.html', { root: path.join(__dirname, './static') });
// });


app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
