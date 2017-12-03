var chokidar = require("chokidar");
var gulp = require("gulp");
const path = require("path");

let cwd = process.cwd();

module.exports = {
    createCompiler({container,lookupDirs,distDir}) {
// console.log(path.join(cwd, distDir));
        var compileStyl = function() {
            return new Promise((resolve, reject)=> {

                var stylus = require("gulp-stylus");
                gulp.src(path.join(cwd, container.dir, container.file))
                    .pipe(stylus({
                        compress: true
                    }))
                    .pipe(gulp.dest(path.join(cwd, distDir)))
                    .on("end", function() {
                        resolve();
                        console.log("Compiling stylus done");
                    })
                ;
            });
        };

        var inject_ = function() {
            return new Promise((resolve, reject)=> {


                var target = gulp.src(path.join(cwd, container.dir, container.file) );
                var sort = require('gulp-sort');
                var sources = gulp.src(lookupDirs.map((lookupDir) => path.join(cwd, lookupDir, "**/*.styl")), {read: false}).pipe(sort());

                var inject = require("gulp-inject");
                target
                    .pipe(inject(sources, {
                        starttag: '// inject:all',
                        endtag: '// endinject',
                        transform: function (filepath, file, i, length) {
                            if (filepath.startsWith(`/${container.dir}`)) {
                                return null;
                            }
                            return `@import "${container.dir.replace(new RegExp("[^/]+", "g"), "..")}${filepath}";`;
                        }
                    }))
                    .pipe(gulp.dest(path.join(cwd, container.dir)))
                    .on("end", ()=>{
                        console.log("Inject stylus done");
                        resolve();
                    })
                ;
            });
        };

        return {
            watch: ()=> {
                inject_().then(() => {
                    compileStyl();

                    chokidar
                        .watch(lookupDirs.map((lookupDir) => path.join(cwd, lookupDir, "**/*.styl")), {
                            ignoreInitial: true
                        })
                        .on('add', function(event, path) {
                            inject_();
                        })
                        .on('unlink', function(event, path) {
                            inject_();
                        })
                        .on('change', function(event, path) {
                            compileStyl();
                        })
                    ;
                });

            },
            compile: ()=> {
                return inject_().then(compileStyl);
            }
        };
    }
};