const RandomUtil = {
    select(values) {
        return values[Math.floor(Math.random() * values.length)];
    },
    randomId() {
        let text = "";
        let possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        for( let i=0; i < 10; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },
    // Include from, exclude to
    between(from, to) {
        return Math.random() * (to-from) + from;
    },
    bool() {
        return Math.random() < 0.5;
    }
};

exports.RandomUtil = RandomUtil;