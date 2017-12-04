var fs = require('fs');
var archiver = require('archiver');

const PrototypePackager = {
    packageServer(config, rootDir) {
        return new Promise((resolve, reject) => {

            let path = process.cwd() + '/example.zip';
            var output = fs.createWriteStream(path);

            var archive = archiver('zip', {
                zlib: { level: 9 } // Sets the compression level.
            });

            archive.on('error', function(err) {
                throw err;
            });
            output.on('close', function() {
                resolve(path);
            });

            archive.pipe(output);

            config.staticAssets.forEach(({dir, as}) => {
                archive.directory(rootDir + "/" + dir, as);
            });
            archive.append(JSON.stringify(config), {name: "prototype-server.json"});
            archive.append(fs.createReadStream(rootDir + "/" + config.index), {name: "index.html"});

            archive.finalize();
        });
    }
};

exports.PrototypePackager = PrototypePackager;