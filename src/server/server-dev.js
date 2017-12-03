var ServerCore = require("./server-core.js").ServerCore;

ServerCore.start(1221, (app) => {
    return require("http").createServer(app);
});