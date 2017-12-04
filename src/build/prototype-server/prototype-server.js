const express = require("express");
const Path = require("path");

const PrototypeServer = {
    startLocal(config, port) {
        var httpApp = express();
        ["/"].concat(config.indexServingPaths).forEach((path) =>
            httpApp.get(path, (req, res) => {
                res.sendFile(Path.resolve(process.cwd() + "/" + config.index));
            })
        );

        config.staticAssets.forEach((staticAsset) =>
            httpApp.use(staticAsset.as, express.static(process.cwd() + "/" + staticAsset.dir))
        );

        let server = require("http").createServer(httpApp);

        server.listen((port), ()=> console.log(`Server started at ${port}`));
    }
};

exports.PrototypeServer = PrototypeServer;