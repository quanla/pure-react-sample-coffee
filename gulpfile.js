var gulp = require("gulp");
var spawn = require('child_process').spawn;

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
    require("./src/server/server-dev");
});

