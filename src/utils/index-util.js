var ObjectUtil = require("./object-util.js").ObjectUtil;
var Cols = require("./cols.js").Cols;

function concat(i1, i2) {
    if (i1.length) {
        return i1.concat(i2);
    }
    let ret = {};

    function swallow(i1, i2) {
        for (var k in i1) {
            if (ret[k]) {
                continue;
            }
            let v1 = i1[k];
            let v2 = i2[k];
            if (v2) {
                ret[k] = concat(v1, v2);
            } else {
                ret[k] = v1;
            }
        }
    }

    swallow(i1, i2);
    swallow(i2, i1);
    return ret;
}


function addToIndex(e, index, keys) {
    let key = keys[0];
    let subKeys = keys.slice(1);

    let indexVal = e[key];

    if (subKeys.length) {
        let subIndex = index[indexVal];
        if (subIndex === undefined) {
            subIndex = {};
            index[indexVal] = subIndex;
        }

        addToIndex(e, subIndex, subKeys);
    } else {
        let subList = index[indexVal];
        if (subList === undefined) {
            subList = [];
            index[indexVal] = subList;
        }
        subList.push(e);
    }
}
function indexBy(indexKeys, col) {
    let ret = {};

    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        addToIndex(e, ret, indexKeys);
    }
    return ret;
}

function indexGet(keys, index) {
    let key = keys[0];
    let subIndex = index[key];
    if (subIndex == null) {
        return null;
    } else {
        if (keys.length > 1) {
            let subKeys = keys.slice(1);
            return indexGet(subKeys, subIndex);
        } else {
            return subIndex;
        }
    }
}

function findAll(index, fn) {
    if (index.length !== undefined) {
        return Cols.find(index,fn);
    } else {
        for (var k in index) {
            if (findAll(index[k], fn)) {
                return true;
            }
        }
        return false;
    }
}

function find(keys, index, fn) {
    let key = keys[0];
    let subIndex = index[key];
    if (subIndex == null) {
        return false;
    } else {
        if (keys.length > 1) {
            let subKeys = keys.slice(1);
            return find(subKeys, subIndex, fn);
        } else {
            return findAll(subIndex, fn);
        }
    }
}

function countAll(index) {

    if (index.length != undefined) {
        return index.length;
    } else {
        let total = 0;
        for (var k in index) {
            total += countAll(index[k]);
        }
        return total;
    }
}
function count(keys, index) {
    let key = keys[0];
    let subIndex = index[key];
    if (subIndex == null) {
        return 0;
    } else {
        if (keys.length > 1) {
            let subKeys = keys.slice(1);
            return count(subKeys, subIndex);
        } else {
            return countAll(subIndex);
        }
    }
}

function forEachAll(index, fn) {

    if (index.length != undefined) {
        index.forEach(fn);
    } else {
        for (let k in index) {
            forEachAll(index[k], fn);
        }
    }
}
function forEach( keys, index, fn) {
    let key = keys[0];
    let subIndex = index[key];
    if (subIndex == null) {
        return;
    } else {
        if (keys.length > 1) {
            let subKeys = keys.slice(1);
            forEach(subKeys, subIndex, fn);
        } else {
            forEachAll(subIndex, fn);
        }
    }
}
function eachList( index, fn, parentKeys) {
    if (index == null) {
        return;
    }
    if (index.length !== undefined) {
        let result = fn(index, parentKeys);
        if (result) {
            return true;
        }

    } else {
        for (let k in index) {
            let result = eachList(index[k], fn, parentKeys == null ? [k] : parentKeys.concat([k]));
            if (result) {
                return true;
            }
        }
    }
}
function mapLeaves( index, fn) {
    if (index.length !== undefined) {
        return index.map(fn);
    } else {
        let ret = {};
        for (let k in index) {
            ret[k] = mapLeaves(index[k], fn);
        }
        return ret;
    }
}
function findLeaf( index, fn) {
    if (index.length !== undefined) {
        return Cols.find(index, fn);
    } else {
        for (let k in index) {
            let foundLeaf = findLeaf(index[k], fn);
            if (foundLeaf) {
                return foundLeaf;
            }
        }
    }
}
function singleLeaf(index) {
    return IndexUtil.findLeaf(index, () => true);
}

function forEachDepth(index, depth, fn, parentPath) {
    if (depth == 0) {
        return fn(index, parentPath);
    }

    for (var k in index) {
        let result = forEachDepth(index[k], depth - 1, fn, (parentPath || []).concat([k]));
        if (result) {
            return result;
        }
    }
}

function filterKey(level, index, fn) {

    if (level == 0) {
        return ObjectUtil.filterKey(index, fn);
    } else {
        let ret = {};
        for (let k in index) {
            ret[k] = filterKey(level - 1, index[k], fn);
        }
        return ret;
    }
}

function findList(index, fn, parentKeys) {
    if (index.length !== undefined) {
        if (fn(index, parentKeys)) {
            return index;
        }
    } else {
        for (let k in index) {
            let found = findList(index[k], fn, parentKeys == null ? [k] : parentKeys.concat([k]));
            if (found) {
                return found;
            }
        }
    }
}

const IndexUtil = {
    findLeaf,
    singleLeaf,
    indexBy,
    indexGet,
    find,
    count,
    countAll,
    forEach,
    forEachAll,
    eachList,
    forEachDepth,
    mapLeaves,
    filterKey,
    findList,
    concat,
};

exports.IndexUtil = IndexUtil;