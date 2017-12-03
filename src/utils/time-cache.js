const TimeCache = {
    createTimeCache(fn, duration) {

        let cache = undefined;
        let lastTime = undefined;

        return () => {
            let now = new Date().getTime();
            if (lastTime === undefined || lastTime < now - duration) {
                lastTime = now;
                cache = fn();
            }

            return cache;
        };
    }
};

exports.TimeCache = TimeCache;