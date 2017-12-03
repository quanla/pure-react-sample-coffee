
function createAsyncCache(asyncFn) {
    let resolveds = {};
    let loadings = {};

    return {
        retrieve(key) {
            if (resolveds.hasOwnProperty(key)) {
                return Promise.resolve(resolveds[key]);
            }
            if (loadings.hasOwnProperty(key)) {
                return loadings[key];
            }

            return loadings[key] = asyncFn(key).then((value) => {
                delete loadings[key];

                resolveds[key] = value;
                return value;
            });
        },
        getInCache(key) {
            return resolveds[key];
        }
    };
}

function createSingleAsyncCache(asyncFn) {
    let asyncCache = createAsyncCache(asyncFn);
    return () => asyncCache.retrieve(0);
}


const AsyncCache = {
    createAsyncCache,
    createSingleAsyncCache,
};

exports.AsyncCache = AsyncCache;
