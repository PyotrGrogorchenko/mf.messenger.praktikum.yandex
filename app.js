"use strict";
const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;
app.use(express.static(path.join(__dirname, 'static')));
app.get('/', function (request, res) {
    res.status(200).sendFile('index.html', { root: path.join(__dirname, './static') });
});
app.get('/login', function (request, res) {
    res.status(200).sendFile('login.html', { root: path.join(__dirname, './static') });
});
app.get('/signup', function (request, res) {
    res.status(200).sendFile('signup.html', { root: path.join(__dirname, './static') });
});
app.get('/selectChat', function (request, res) {
    res.status(200).sendFile('selectChat.html', { root: path.join(__dirname, './static') });
});
app.get('/chat', function (request, res) {
    res.status(200).sendFile('chat.html', { root: path.join(__dirname, './static') });
});
app.get('/userSettings', function (request, res) {
    res.status(200).sendFile('userSettings.html', { root: path.join(__dirname, './static') });
});
app.get('/error404', function (request, res) {
    res.status(200).sendFile('error404.html', { root: path.join(__dirname, './static') });
});
app.get('/error500', function (request, res) {
    res.status(200).sendFile('error500.html', { root: path.join(__dirname, './static') });
});
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
