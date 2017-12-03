const {Cols} = require("../cols");
function findAtLevel(data, levels, levelIndex, targetLevel, fn) {
    if (targetLevel == levelIndex) {
        return fn(data) && data;
    }
    if (targetLevel < levelIndex) {
        return false;
    }
    let level = levels(levelIndex);

    if (level.getChildren == null) {
        return false;
    }

    let children = level.getChildren(data);
    for (let i = 0; i < children.length; i++) {
        let child = children[i];

        let found = findAtLevel(child.data, levels, levelIndex + 1, targetLevel, fn);
        if (found) {
            return found;
        }
    }
}

function eachAtLevel(data, levels, fromLevel, targetLevel, fn) {
    if (targetLevel == fromLevel) {
        fn(data);
        return;
    }
    let level = levels(fromLevel);

    if (level.getChildren == null) {
        throw "Can not go deeper";
    }

    let children = level.getChildren(data);
    for (let i = 0; i < children.length; i++) {
        let child = children[i];

        eachAtLevel(child.data, levels, fromLevel + 1, targetLevel, fn);
    }
}

function add1(maniList, levels, levelIndex) {

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        throw "Funny add";
    }

    let children = [];
    maniList.forEach((mani) => {
        let thisChildren = level.getChildren(mani);

        thisChildren.forEach((tc) => {
            let existing = children.find((c) => c.key == tc.key);
            if (existing == null) {
                children.push(tc);
            } else if (levels[levelIndex + 1].getChildren) {
                children.splice(children.indexOf(existing), 1, {key: tc.key, data: add1([existing.data, tc.data], levels, levelIndex + 1)});
            } else {
                // Do nothing
            }
        });
    });

    let old = {};
    maniList.forEach((mani) => Object.assign(old, mani));
    return level.reconstruct(children, old);
}


function add(maniList, levels) {
    maniList = maniList.filter((a) => a != null);
    return add1(maniList, levels, 0);
}


function remove1(target, from, levels, levelIndex) {

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        throw "Funny remove";
    }

    let children = level.getChildren(from);
    level.getChildren(target).forEach((tc) => {
        let existing = children.find((c) => c.key == tc.key);
        if (existing != null) {

            let subLevel = levels[levelIndex + 1];

            if (subLevel==null || subLevel.getChildren == null) {
                children.splice(children.indexOf(existing), 1);
            } else {
                let merged = remove1(tc.data, existing.data, levels, levelIndex + 1);
                if (merged == null) {
                    children.splice(children.indexOf(existing), 1);
                } else {
                    children.splice(children.indexOf(existing), 1, {key: tc.key, data: merged});
                }
            }

        }
    });
    return children.length == 0 ? null : level.reconstruct(children, from);
}


function remove(targetData, fromData, levels) {
    return remove1(targetData, fromData, levels, 0);
}

function excludePath1(path, fromData, levels, levelIndex) {

    let level = levels(levelIndex);

    if (path.length == 0) {
        return null;
    }

    let children = level.getChildren(fromData);
    let removedKey = path[0];

    let existing = children.find((c) => c.key == removedKey);
    if (existing != null) {

        let removed = excludePath1(path.slice(1), existing.data, levels, levelIndex + 1);
        if (removed) {
            children.splice(children.indexOf(existing), 1, {key: existing.key, data: removed});
        } else {
            children.splice(children.indexOf(existing), 1);
        }

        return children.length == 0 ? null : level.reconstruct(children, fromData);
    } else {
        return fromData;
    }
}


function excludePath(path, fromData, levels) {
    return excludePath1(path, fromData, levels, 0);
}

function updateFull1(old, by, levels, levelIndex) {

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        throw "Funny updateFull";
    }

    let byChildren = level.getChildren(by);
    let oldChildren = level.getChildren(old);

    for (let i = oldChildren.length - 1; i > -1; i--) {
        let oldChild = oldChildren[i];

        let inBy = byChildren.find((c) => c.key == oldChild.key);
        if (inBy != null) {

            let subLevel = levels[levelIndex + 1];

            if (subLevel==null || subLevel.getChildren == null) {
                oldChildren.splice(i, 1, inBy);
            } else {
                let updated = updateFull1(oldChild.data, inBy.data, levels, levelIndex + 1);
                oldChildren.splice(i, 1, {key: oldChild.key, data: updated});
            }
        } else {
            // Remove if not found in new list
            oldChildren.splice(i, 1);
        }
    }
    return oldChildren.length == 0 ? null : level.reconstruct(oldChildren, old);
}

/**
 * Update to new leaves, if not found then remove
 */
function updateFull(old, by, levels) {
    return updateFull1(old, by, levels, 0);
}


function update1(src, by, levels, levelIndex) {

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        return by;
    }

    let srcChildren = level.getChildren(src);
    let byChildren = level.getChildren(by);
    srcChildren.forEach((sc) => {
        let updating = byChildren.find((bc) => bc.key == sc.key);
        if (updating != null) {

            let updated = update1(sc.data, updating.data, levels, levelIndex + 1);

            srcChildren.splice(srcChildren.indexOf(sc), 1, {key: sc.key, data: updated});
        }
    });
    return srcChildren.length == 0 ? null : level.reconstruct(srcChildren);
}


function update(src, by, levels) {
    return update1(src, by, levels, 0);
}

function filter1(data, key, levels, levelIndex, fn) {
    if (!fn(data, key, levelIndex)) {
        return null;
    }

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        return data;
        // return null;
    }

    let children = level.getChildren(data);

    let filteredChildren = children.map(({key, data}) => ({key, data: filter1(data, key, levels, levelIndex + 1, fn)})).filter(({data}) => data !== null);

    if (filteredChildren.length == 0) {
        return null;
    }

    return level.reconstruct(filteredChildren, data);
}

function filter(data, levels, fn) {
    return filter1(data, null, levels, 0, fn);
}

function map1(data, key, levels, levelIndex, checkFn, mapFn) {
    if (checkFn(data, key, levelIndex)) {
        return mapFn(data, key, levelIndex);
    }

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        return data;
        // return null;
    }

    let children = level.getChildren(data);

    let filteredChildren = children.map(({key, data}) => ({key, data: map1(data, key, levels, levelIndex + 1, checkFn, mapFn)}));

    if (filteredChildren.length == 0) {
        return null;
    }

    return level.reconstruct(filteredChildren, data);
}

function map(data, levels, checkFn, mapFn) {
    return map1(data, null, levels, 0, checkFn, mapFn);
}

function gentleMap1(data, levels, levelIndex, mapFn) {
    let mapped = mapFn(data, levelIndex);

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        return mapped;
    }

    let children = level.getChildren(data);

    let filteredChildren = children.map(({key, data}) => ({key, data: gentleMap1(data, levels, levelIndex + 1, mapFn)}));

    return level.reconstruct(filteredChildren, mapped);
}

function gentleMap(data, levels, mapFn) {
    return gentleMap1(data, levels, 0, mapFn);
}


function map(data, level, fn) {
    let mapped = fn(data);

    let children = level.getChildren(data);
    if (children == null) {
        return mapped;
    }

    children = children.map((child) => map(child, level, fn));

    return level.reconstruct(children, mapped);
}




function setPath(path, data, getNewPathData, getLevel, initData) {
    if (Cols.isEmpty(path)) {
        return getNewPathData(data);
    } else {
        let key = path[0];

        let level = getLevel();
        let children = data == null ? [] : level.getChildren(data);
        let existing = children.find((c) => c.key == key);

        if (existing) {
            children = Cols.replace1(children, existing, {key, data: setPath(path.slice(1), existing.data, getNewPathData, getLevel, initData)});
        } else {
            children.push({key, data: setPath(path.slice(1), initData && initData(data, key), getNewPathData, getLevel, initData)});
        }

        return level.reconstruct(children, data);
    }

}

function mutatePath(path, data, mutate, getLevel, initData) {
    if (Cols.isEmpty(path)) {
        mutate(data);
    } else {
        let key = path[0];

        let level = getLevel();
        let children = data == null ? [] : level.getChildren(data);
        let existing = children.find((c) => c.key == key);

        if (existing) {
            mutatePath(path.slice(1), existing.data, mutate, getLevel, initData);
        } else {
            let newData = initData(data, key);
            mutatePath(path.slice(1), newData, mutate, getLevel, initData);
            level.addChild({key, data: newData}, data);
        }
    }
}

function mutateAll(data, mutate, getLevel) {
    mutate(data);

    let level = getLevel();
    let children = data == null ? [] : level.getChildren(data);

    children.forEach(({data}) => mutateAll(data, mutate, getLevel));
}
function getPath(path, data, getLevel) {

    for (let i = 0; path && i < path.length; i++) {
        if (data == null) {
            return data;
        }

        let level = getLevel(i);

        if (level.getChildren == null) {
            throw "End?";
        }

        let list = level.getChildren(data);

        let key1 = path[i];
        let holder = list.find(({key}) => key1 == key);
        data = holder == null ? null : holder.data;
    }

    return data;
}

function occurrenceDensity1(target, from, fastReturn, levelIndex, levels) {

    let level = levels(levelIndex);

    if (level.getChildren == null) {
        throw "Dead";
    }

    let children = level.getChildren(target);
    let fromChildren = level.getChildren(from);
    let nonExistsList = children.filter((child) => fromChildren.find((fc) => fc.key == child.key) == null );
    let existsList    = children.filter((child) => nonExistsList.indexOf(child) == -1 );

    if (existsList.length == 0) {
        return 0;
    }

    if (levels[levelIndex + 1].getChildren == null) {
        return nonExistsList.length == 0 ? 2 : 1;
    }

    let previous = null;
    if (nonExistsList.length) {
        if (fastReturn == 0) {
            return 0;
        }
        previous = 0;
    }

    for (let i = 0; i < existsList.length; i++) {
        let existChild = existsList[i];
        let fromChild = fromChildren.find((fc) => fc.key == existChild.key);

        let density1 = occurrenceDensity1(existChild.data, fromChild.data, previous == null ? fastReturn : previous == 0 ? 2 : 0, levelIndex + 1, levels);
        if (density1 == 1 || (previous != null && density1 != previous)) {
            return 1;
        }

        if (fastReturn != null && fastReturn == density1) {
            return fastReturn;
        }

        previous = density1;
    }

    return previous;
}

function occurrenceDensity(target, from, levels) {
    if (from == null) {
        return 0;
    }
    return occurrenceDensity1(target, from, null, 0, levels);
}

function extract(path, data, levels) {
    let ret = getPath(path, data, levels);
    if (ret == null) {
        return ret;
    }
    for (var i = path.length - 1; i > -1; i--) {
        let parent = getPath(path.slice(0, i), data, levels);
        let parentLevel = levels(i);
        ret = parentLevel.reconstruct([{
            key: path[i],
            data: ret,
        }], parent);
    }
    return ret;
}



function scan1(data, level, parentKeys, fn) {
    let result = fn(data, parentKeys);
    if (result) {
        if (result.found) {
            return result;
        } else if (result.skip) {
            return false;
        }
    }

    let children = level.getChildren(data);
    if (children == null) {
        return false;
    }
    for (let i = 0; i < children.length; i++) {
        let {key, data} = children[i];
        let result = scan1(data, level, parentKeys.concat([key]), fn);
        if (result && result.found) {
            return result;
        }
    }
}
function scan(data, level, fn) {
    let result = scan1(data, level, [], fn);
    return result && result.found;
}




const KeyedHierDataUtil = {
    findAtLevel,
    eachAtLevel,
    occurrenceDensity,
    filter,
    map,
    scan,
    gentleMap,
    getPath,
    setPath,
    mutatePath,
    mutateAll,
    add,
    remove,
    excludePath,
    update,
    updateFull,
    extract,
};

exports.KeyedHierDataUtil = KeyedHierDataUtil;