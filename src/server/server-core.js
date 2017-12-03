const express = require("express");

const ServerCore = {
    start(port, serverFactory) {

        const app = express();

        app.use(express.static(__dirname + "/public"));
        app.use(express.static(__dirname + "/../../dist"));

        let server = serverFactory(app);
        server.listen(port, () => console.log(`App started on ${port}`));
    }
};

exports.ServerCore = ServerCore;