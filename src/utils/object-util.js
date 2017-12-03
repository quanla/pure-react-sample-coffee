const {StringUtil} = require("./string-util.js");

function nextPathAttr(path) {
    if (!isNaN(path)) {
        return {
            attr: path,
            nextPath: null,
        };
    }
    if (path.startsWith("[")) {
        let indexOf = path.indexOf("]");
        if (indexOf == -1) {
            throw "Unclosed [";
        }
        return {
            attr: JSON.parse(path.substring(1, indexOf)),
            nextPath: path.substring(indexOf + 1).replace(/^\./,""),
        };
    } else {
        let match = /[.\[]/.exec(path);
        if (match == null) {
            return {
                attr: path,
                nextPath: "",
            };
        }

        return {
            attr: path.substring(0, match.index),
            nextPath: path.substring(match.index).replace(/^\./,""),
        };
    }
}

function get(obj, path) {
    if (obj == null) {
        return obj;
    }

    if (StringUtil.isEmpty(path)) {
        return obj;
    }

    let {attr, nextPath} = nextPathAttr(path);

    let child = obj[attr];
    return get(child, nextPath);
}
function getAP(obj, pathArr) {
    if (obj == null) {
        return obj;
    }

    if (pathArr == null || pathArr.length == 0) {
        return obj;
    }

    let child = obj[pathArr[0]];
    return getAP(child, pathArr.slice(1));
}

function updatePath(object, path, value) {

    if (StringUtil.isEmpty(path)) {
        return value;
    }

    let {attr, nextPath} = nextPathAttr(path);

    if (Array.isArray(object)) {
        let clone = object.slice(0);
        clone[attr] = updatePath(object && object[attr], nextPath, value);
        return clone;
    } else {
        return Object.assign({}, object, {[attr]: updatePath(object && object[attr], nextPath, value)});
    }

}
function modifyPath(object, path, fn) {
    return updatePath(object, path, fn(get(object, path)));
}

// @deprecated
function update1(obj, changes) {
    return Array.isArray(obj) ?
        (()=> {
            let ret = obj.slice(0);
            for (var k in changes) {
                ret[k] = changes[k];
            }
            return ret;
        })() :
        Object.assign({}, obj, changes);
}

function keys(obj) {
    let ret = [];
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            ret.push(k);
        }
    }
    return ret;
}
function size(obj) {
    if (obj == null) {
        return 0;
    }
    let count = 0;
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            count++;
        }
    }
    return count;
}

function map(obj, fn) {
    let ret = {};

    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            ret[k] = fn(obj[k], k);
        }
    }

    return ret;
}
function mapKeys(obj, fn) {
    let ret = {};
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            ret[fn(k)] = obj[k];
        }
    }
    return ret;
}
function omit(obj, attrs) {
    if (obj == null) {
        return obj;
    }
    let ret = {};

    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            if (attrs.indexOf(k) > -1) {
                continue;
            }
            ret[k] = obj[k];
        }
    }

    return ret;
}
function exclude(obj, by) {

    let newObj = {};
    let changed = false;
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            let val = obj[attr];
            if (by(val, attr)) {
                changed = true;
            } else {
                newObj[attr] = val;
            }
        }
    }

    return !changed ? obj : newObj;
}
function mapValuesToList(obj, fn) {
    let ret = [];

    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            ret.push(fn(obj[k], k));
        }
    }

    return ret;
}

function forEach(obj, fn) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            let interrupted = fn(obj[k], k);
            if (interrupted) {
                return;
            }
        }
    }
}

function findValue(obj, fn) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k];
            if (fn(value, k)) {
                return value;
            }
        }
    }
}

function findKeep(obj, fn) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k];
            let found = fn(value, k);
            if (found) {
                return found;
            }
        }
    }
}
function removeValue(obj, fn) {
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k];
            if (fn(value, k)) {
                delete obj.k;
            }
        }
    }
}
function filterValues(obj, fn) {
    if (obj==null) {
        return [];
    }
    let ret = [];
    for (let k in obj) {
        if (obj.hasOwnProperty(k)) {
            let value = obj[k];
            if (fn(value, k)) {
                ret.push(value);
            }
        }
    }
    return ret;
}

function filterKey(obj, fn) {
    let ret = {};
    for (var k in obj) {
        if (obj.hasOwnProperty(k) && fn(k)) {
            ret[k] = obj[k];
        }
    }
    return ret;
}


function isEqualsShallow(a, b) {
    if (a == null) {
        return b == null;
    } else if (b == null) {
        return false;
    }

    let keys1 = keys(a);
    let keys2 = keys(b);
    if (keys1.length != keys2.length) {
        return false;
    }

    for (let i = 0; i < keys1.length; i++) {
        let key = keys1[i];

        if(a[key] !== b[key]) {
            return false;
        }
    }
    return true;
}
function equalShallowExcept(a, b, attrs) {
    if (a == null) {
        return b == null;
    } else if (b == null) {
        return false;
    }

    let keys1 = keys(a);
    let keys2 = keys(b);
    if (keys1.length != keys2.length) {
        return false;
    }

    for (let i = 0; i < keys1.length; i++) {
        let key = keys1[i];

        if (a[key] !== b[key] && attrs.indexOf(key) == -1) {
            return false;
        }
    }
    return true;
}

function isEmpty(obj) {
    if (obj == null) {
        return true;
    }

    for (var k in obj) {
        if (obj.hasOwnProperty(k) && obj[k] != null) {
            return false;
        }
    }
    return true;
}
function isNotEmpty(obj) {
    return !isEmpty(obj);
}

function single(obj) {
    for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
            return obj[k];
        }
    }
}

function isChildPath(child, parent) {
    return parent == "" || child.startsWith(parent + ".") || child.startsWith(parent + "[");
}

function relativePath(parentPath, path) {
    if (parentPath == null) {
        return path;
    }
    if (path == parentPath) {
        return "";
    }
    if (!path.startsWith(parentPath)) {
        throw `Need ${path} to be child of ${parentPath}`;
    }
    path = path.substring(parentPath.length);
    return path.startsWith(".") ? path.substring(1) : path;
}

function joinPaths(...paths) {
    let p = paths[0];
    for (let i = 1; i < paths.length; i++) {
        let p1 = paths[i];
        p = joinPaths2(p, p1);
    }
    return p;
}
function joinPaths2(p1, p2) {
    if (StringUtil.isEmpty(p1)) {
        return typeof p2 == "string" ? p2 : `[${p2}]`;
    }
    if (StringUtil.isEmpty(p2)) {
        return p1;
    }

    return p1 + (
        typeof p2 == "string" ? (
            `.${p2}`
        ) : (
            `[${p2}]`
        )
    );
}

function getter(by) {
    if (typeof by == "string") {
        return (o) => o[by];
    }

    return by;
}

function equalDeep(o1, o2) {
    if (o1 === o2) {
        return true;
    }
    if (typeof o1 !== "object" || typeof o2 !== "object") {
        return false;
    }
    for (let k in o1) {
        if (!equalDeep(o1[k], o2[k])) {
            return false;
        }
    }
    for (let k in o2) {
        if (!o1.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}

function concat(path, obj, pushArr) {
    return updatePath(path, obj, (arr) => arr == null ? pushArr : arr.concat(pushArr));
}

function removeEmpty(obj) {
    Object.keys(obj).forEach((key) => (obj[key] == null || obj[key] === undefined) && delete obj[key]);
    return obj;
}

function delegate(getObj) {
    let ret = {};
    Object.keys(getObj()).forEach((key) =>
        ret[key] = function(...args) {
            return getObj()[key].apply(null, args);
        }
    );
    return ret;
}

function pathToAp(path) {
    if (StringUtil.isEmpty(path)) {
        return [];
    }
    let arr = [];
    for (;;) {
        if (StringUtil.isEmpty(path)) {
            return arr;
        }
        let {attr, nextPath} = nextPathAttr(path);
        arr.push(attr);
        path = nextPath;
    }
}

const O = {
    get,
    getAP,
    pathToAp,
    single,
    isEmpty,
    isNotEmpty,
    isChildPath,
    relativePath,
    findValue,
    findKeep,
    filterValues,
    getter,
    delegate,
    isEqualsShallow,
    equalDeep,
    removeEmpty,
    update: update1,
    updatePath,
    modifyPath,
    concat,
    keys,
    map,
    mapKeys,
    mapValuesToList,
    forEach,
    filterKey,
    size,
    omit,
    exclude,
    equalShallowExcept,
    joinPaths,
    nextPathAttr,
};

exports.O = O;
exports.ObjectUtil = Object.assign({}, O, {
    get(path, obj) {
        return get(obj, path);
    },
});
