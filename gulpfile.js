var gulp = require("gulp");
var spawn = require('child_process').spawn;
let {Deploy} = require("./src/build/deploy");

function createStylusCompiler() {
    return require("./src/build/stylus-compiler").createCompiler({
        container: {
            dir: `src/server/public/assets/styl`,
            file: "style.styl",
        },
        lookupDirs: [
            `src/client`
        ],
        distDir: `dist/css/client`,
    });
}


const stylusCompiler = createStylusCompiler();

gulp.task("build:watch", () => {
    stylusCompiler.watch();

    if (!/^win/.test(process.platform)) { // linux
        spawn("webpack", ["--watch"], {stdio: "inherit"});
    } else {
        spawn('cmd', ['/s', "/c", "webpack", "--watch"], {stdio: "inherit"});
    }
});


gulp.task("dev", ["build:watch"], () => {
    require("./src/server/server");
});


gulp.task("deploy", [], () => {
    (()=> {
        return new Promise((resolve, reject) => {

            let ps;
            if (!/^win/.test(process.platform)) { // linux
                ps = spawn("webpack", "-p".split(" "), {stdio: "inherit"});
            } else {
                ps = spawn('cmd', ['/s', "/c", "webpack"].concat("-p".split(" ")), {stdio: "inherit"});
            }

            ps.on('close', (code) => {
                if (code !== 0) {
                    console.log(`ps process exited with code ${code}`);
                    reject(code);
                } else {
                    resolve();
                }

            });
        });
    })().then(() => {
        Deploy.doDeploy();
    });
});