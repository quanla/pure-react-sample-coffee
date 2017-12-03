
const CacheUtil = {
    cache0: (fn) => {
        let invoked = false;
        let val = null;

        return () => {
            if (invoked) {
                return val;
            }

            val = fn();
            invoked = true;
            return val;
        };
    },
    cache1: (cacheKeyFn, fn) => {
        let cache = {};

        return (target) => {
            let key = cacheKeyFn(target);
            let cachedVal = cache[key];
            if (cachedVal !== undefined) {
                return cachedVal;
            }

            let val = fn(target);
            cache[key] = val;
            return val;
        };
    },
};

exports.CacheUtil = CacheUtil;