const {ObjectUtil} = require("./object-util");
const {ColBinaryView} = require("./col-binary-view/col-binary-view.js");

function createArray(val, size) {
    let ret = [];
    for (let i = 0; i < size; i++) {
        ret.push(val);
    }
    return ret;
}

function sortBy(valF) {
    if (typeof valF == "function") {
        return (o1, o2) => {
            return valF(o1) > valF(o2) ? 1 : -1;
        };
    } else {
        let list = valF;

        return (o1, o2) => {
            for (let i = 0; i < list.length; i++) {
                let valF = list[i];
                let v1 = valF(o1);
                let v2 = valF(o2);
                if (v1 != v2) {
                    return v1 > v2 ? 1 : -1;
                }
            }
            return 0;
        };
    }
}

function sort(col, by) {
    let clone = col.slice(0);
    clone.sort(sortBy(by));
    return clone;
}

function reverse(col) {
    let ret = [];
    for (var i = col.length - 1; i > -1; i--) {
        ret.push(col[i]);

    }
    return ret;
}

function minPair(col1, col2, fn) {
    let minVal = null;
    let me1, me2;
    for (let i = 0; i < col1.length; i++) {
        let e1 = col1[i];
        for (let j = 0; j < col2.length; j++) {
            let e2 = col2[j];

            let val = fn(e1, e2);

            if (minVal == null || minVal > val) {
                minVal = val;
                me1 = e1;
                me2 = e2;
            }
        }
    }
    return {val: minVal, e1: me1, e2: me2};
}

function fnToCol(fn) {
    let ret = [];
    let feed = (e) => ret.push(e);

    fn(feed);
    return ret;
}

function minE(col, valueF, shortcutVal) {
    let minE = null;
    let minVal = null;
    for (let i = 0; i < col.length; i++) {
        let e = col[i];

        let value = valueF(e);

        if (shortcutVal !== undefined && shortcutVal == value) {
            return e;
        }

        if (minE == null || value < minVal) {
            minE = e;
            minVal = value;
        }
    }
    return minE;
}

function min2E(col, valueF) {
    let mins = ColBinaryView.createColBinaryView([], (h) => h.val);
    for (let i = 0; i < col.length; i++) {
        let e = col[i];

        let value = valueF(e);

        if (mins.col().length < 2 || value < last(mins.col()).val ) {
            mins.insert({e, val: value});

            if (mins.col().length > 2) {
                mins.col().length = 2;
            }
        }
    }
    return mins.col().map((h) => h.e);
}

function reduce(col, iter, initValue) {
    let value = initValue;
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        value = iter(value, e);
    }
    return value;
}

function keys(col) {
    let ret = [];
    for (var k in col) {
        if (col.hasOwnProperty(k)) {
            ret.push(k);
        }
    }
    return ret;
}

function hasDuplicates(col, by) {
    for (let i = 0; i < col.length; i++) {
        let e1 = col[i];
        let v1 = by(e1);
        for (let j = i + 1; j < col.length; j++) {
            let e2 = col[j];
            let v2 = by(e2);
            if (v1 == v2) {
                return true;
            }
        }
    }
    return false;
}

function removeDuplicates(col, by) {
    for (let i = 0; i < col.length; i++) {
        let e1 = col[i];
        let v1 = by(e1);
        for (let j = i + 1; j < col.length; j++) {
            let e2 = col[j];
            let v2 = by(e2);
            if (v1 == v2) {
                col.splice(j, 1);
                j--;
            }
        }
    }
}

function find(col, fn) {
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        if (fn(e)) {
            return e;
        }
    }
}

function findKeep(col, fn) {
    if (col == null) {
        return null;
    }
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        let found = fn(e, i);
        if (found) {
            return found;
        }
    }
}

function min(col, comparer) {
    comparer = comparer || ((a1, a2)=> a1-a2);
    let min = null;
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        if (min == null || comparer(min, e) > 0) {
            min = e;
        }
    }
    return min;
}

function addToListByOrder(e1, e2, list) {
    if (list.length == 0) {
        list.push(e1);
        list.push(e2);
    } else {
        let indexOf = list.indexOf(e1);
        if (indexOf > -1) {
            list.splice(indexOf + 1, 0, e2);
        } else {
            let indexOf2 = list.indexOf(e2);
            list.splice(indexOf2, 0, e1);
        }
    }
}

function first(col) {
    if (col == null) {
        return null;
    }
    return col[0];
}

function last(col) {
    return col[col.length - 1];
}

function indexOf(col, find) {
    if (col == null) {
        return -1;
    }
    for (let i = 0; i < col.length; i++) {
        let e = col[i];
        if (find(e)) {
            return i;
        }
    }
    return -1;
}

function forEach(col, fn) {
    for (let i = 0; i < col.length; i++) {
        let e = col[i];

        let result = fn(e);
        if (result) {
            return result;
        }
    }
}

function equals(col1, col2) {
    if (col1 == null) {
        return col2 == null;
    }
    if (col2 == null) {
        return false;
    }
    if (col1.length != col2.length) {
        return false;
    }
    for (let i = 0; i < col1.length; i++) {
        if (col1[i] != col2[i]) {
            return false;
        }
    }
    return true;
}

function exclude(col, by) {
    return col.filter((e) => !by(e));
}

function mapToMap(col, fn) {
    if (col == null) {
        return col;
    }

    let ret = {};

    col.map((e) => {
        let {key, value} = fn(e);
        ret[key] = value;
    });

    return ret;
}

function count(col, fn) {
    if (col == null) {
        return 0;
    }

    return col.reduce((total, e) => total + (fn(e) ? 1 : 0), 0);
}

function circularIndexOf(col, startIndex, fn) {
    for (let i = startIndex; i < col.length; i++) {
        let e = col[i];
        if (fn(e)) {
            return i;
        }
    }

    for (let i = 0; i < startIndex; i++) {
        let e = col[i];
        if (fn(e)) {
            return i;
        }
    }

    return -1;
}

function map(col, fn) {
    if (col == null) {
        return null;
    }
    return col.map(fn);
}

function flatten(col) {
    let ret = [];

    for (var i = 0; i < col.length; i++) {
        var e = col[i];
        if (Array.isArray(e)) {
            ret = ret.concat(flatten(e));
        } else {
            ret.push(e);
        }
    }

    return ret;
}

function addRemove(col) {
    return (element) => {

        col.push(element);

        return () => remove1Mutate(col, element);
    };
}

function remove1Mutate(col, targetElem) {
    if (col== null) {
        return;
    }

    let i = col.indexOf(targetElem);
    if (i == -1) {
        return;
    }
    col.splice(i, 1);
}

const Cols = {
    addRemove,
    fnToCol,
    equals,
    indexOf,
    minPair,
    reduce,
    keys,
    first,
    last,
    forEach,
    hasDuplicates,
    // Mutates col
    removeDuplicates,
    sort,
    sortBy,
    find,
    findKeep,
    isEmpty(col) {
        return col == null || col.length == 0;
    },
    isNotEmpty(col) {
        return !Cols.isEmpty(col);
    },
    update(col, e, draft) {
        let index = col.indexOf(e);
        return [].concat(col.slice(0, index)).concat([draft]).concat(col.slice(index + 1));
    },
    // Immutable
    addSets(c1, c2) {
        let ret = c1 == null ? [] : c1.slice(0);
        if (c2 == null) {
            return ret;
        }
        for (let i = 0; i < c2.length; i++) {
            let e = c2[i];
            if (ret.indexOf(e) == -1) {
                ret.push(e);
            }
        }
        return ret;
    },
    replace(col, targetElems, replaceElems) {
        return col == null ? null : col.map((t)=> {
            let i = targetElems.indexOf(t);
            if (i == -1) {
                return t;
            } else {
                return replaceElems[i];
            }
        });
    },
    /**
     * Immutable
     * @param col
     * @param targetElem
     * @param replaceElem
     * @returns {null}
     */
    replace1(col, targetElem, replaceElem) {
        return col == null ? null : col.map((t)=> {
            if (targetElem == t) {
                return replaceElem;
            } else {
                return t;
            }
        });
    },
    exclude,
    remove(col, targetElems) {
        return col== null ? null : col.filter((t)=> targetElems.indexOf(t) == -1);
    },
    remove1(col, targetElem) {
        return col== null ? null : col.filter((t)=> targetElem !== t);
    },
    remove1Mutate,
    splice1By(col, by) {
        let index = col.findIndex(by);
        if (index == -1) {
            return;
        }
        return col.splice(index, 1)[0];
    },
    spliceBy(col, by) {
        let ret = [];
        for (let index;(index = col.findIndex(by)) > -1;) {
            ret.concat(col.splice(index, 1));
        }
        return ret;
    },
    selectRange(col, fromToElems) {
        if (fromToElems[0] == fromToElems[1]) {
            return null;
        }
        // Find start
        let [from, to] = _.sortBy(fromToElems.map((e)=> col.indexOf(e)));
        if (from == -1 || to == -1) {
            return null;
        }

        return col.slice(from, to + 1);
    },
    getSame(col, by) {
        let getter = ObjectUtil.getter(by);
        if (col == null || col.length == 0) {
            return null;
        }
        var sample = getter(col[0]);
        if (sample == null) {
            return null;
        }
        for (var i = 1; i < col.length; i++) {
            var e = col[i];
            if (getter(e) != sample) {
                return null;
            }
        }
        return sample;
    },
    move(arr, pos, newPos) {
        if ( arr == null || newPos === pos) return arr;

        arr = arr.slice(0);

        let value = arr[pos];
        let dir = pos > newPos ? -1 : 1 ;

        for(let i = pos; i != newPos; i += dir){
            arr[i] = arr[i + dir];
        }
        arr[newPos] = value;

        return arr;
    },
    min,
    minE,
    min2E,
    minValue(col, valueF) {
        let minE = null;
        let minVal = null;
        for (let i = 0; i < col.length; i++) {
            let e = col[i];

            let value = valueF(e);
            if (minE == null || value < minVal) {
                minE = e;
                minVal = value;
            }
        }
        return minVal;
    },
    maxE(col, valueF) {
        let maxE = null;
        let maxVal = null;
        for (let i = 0; i < col.length; i++) {
            let e = col[i];

            let value = valueF(e);
            if (maxE == null || value > maxVal) {
                maxE = e;
                maxVal = value;
            }
        }
        return maxE;
    },
    maxValue(col, valueF) {
        let maxE = null;
        let maxVal = null;
        for (let i = 0; i < col.length; i++) {
            let e = col[i];

            let value = valueF ? valueF(e) : e;
            if (maxE == null || value > maxVal) {
                maxE = e;
                maxVal = value;
            }
        }
        return maxVal;
    },
    sameSet(col1, col2) {
        if (col1 == null) {
            return col2 == null;
        }
        if (col2 == null) {
            return false;
        }

        if (col1.length != col2.length) {
            return false;
        }

        for (let i = 0; i < col1.length; i++) {
            let e = col1[i];
            if (col2.indexOf(e) == -1) {
                return false;
            }
        }
        return true;
    },
    addToSet(e, set) {
        if (set.indexOf(e) > -1) {
            return;
        }
        set.push(e);

    },
    addToListByOrder,
    addToSortedSet(e, set) {
        if (set.indexOf(e) > -1) {
            return;
        }
        set.push(e);
        set.sort();
    },
    splice(col, startIndex, deleteCount, addItems) {
        return col.slice(0, startIndex).concat(addItems).concat(col.slice(startIndex+deleteCount));
    },
    sum(col) {
        return col.reduce((acc, e) => acc + e);
    },
    conflict(c1, c2) {
        for (let i = 0; i < c1.length; i++) {
            let e1 = c1[i];
            if (c2.indexOf(e1) > -1) {
                return true;
            }
        }
        return false;
    },
    reverse,
    createArray,
    mapToMap,
    circularIndexOf,
    count,
    map,
    flatten,
};

exports.Cols = Cols;