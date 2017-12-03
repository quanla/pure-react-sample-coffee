
function timeout(duration = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

exports.AsyncUtil = {
    timeout,
};