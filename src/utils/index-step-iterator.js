var ObjectUtil = require("./common-utils.js").ObjectUtil;

function getter(index) {
    return (key) => {
        let ret = {};
        // console.log(key);
        ObjectUtil.forEach(index, (val, key1) => {

            let v1 = val[key];
            if (v1) {
                ret[key1] = v1;
            }
        });
        return ret;
    };
}

const IndexStepIterator = {
    stepIterate(step = 1, index, fn) {
        let keys = [];

        let get = getter(index);

        ObjectUtil.forEach(index, (val1, key1) => {
            ObjectUtil.forEach(val1, (val2, key2) => {
                if (keys.indexOf(key2) > -1) {
                    return;
                }
                keys.push(key2);

                fn(key2, get(key2));

            });
        });
    }
};

exports.IndexStepIterator = IndexStepIterator;