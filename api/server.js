const express = require("express");

const server = express();

server.use(express.json());

server.use('*', (req, res) => {
    res.status(404).json({
        message: 'something this wicked this way comes'
    })
})

module.exports = server;
