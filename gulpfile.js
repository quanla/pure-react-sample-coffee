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

    cmd("webpack --watch --mode development");
});

function cmd(cmd, options = {
    stdio: "inherit",
    // stdio: "ignore"
}) {

    return new Promise((resolve, reject) => {
        let split = cmd.split(" ");

        const spawnOptions = !/^win/.test(process.platform) ? [split[0], split.slice(1), options] : ['cmd', ['/s', "/c", ...split], options];

        let p = spawn(...spawnOptions);
        p.on("close", (a, b) => {
            // console.log(a, b)
            resolve();
        });
    });
}

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