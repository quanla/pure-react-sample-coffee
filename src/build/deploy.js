const fs = require("fs");
var extract = require('extract-zip');

const Deploy = {
    doDeploy() {
        var PrototypePackager = require("./prototype-server/prototype-packager.js").PrototypePackager;

        PrototypePackager.packageServer(require("./prototype-server-config"), __dirname + "/../..").then(() => {
            let uploadedPath = process.cwd() + "/example.zip";
            let deployDir = `//Users/quanle/Documents/Workon/Pure-React/coffee-shop-deploy`;
            extract(uploadedPath, {dir: deployDir}, function (err) {
                fs.unlink(uploadedPath);
                fs.unlink(deployDir + "/prototype-server.json");
            });
        });

    }
};

exports.Deploy = Deploy;
