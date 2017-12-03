let keys = {};
window.addEventListener("keydown", (e) => {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", (e) => {
    delete keys[e.keyCode];
});

const keysCapture = {
    getHoldKeys() {
        return keys;
    }
};

exports.keysCapture = keysCapture;