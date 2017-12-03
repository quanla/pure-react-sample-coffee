
function isEmpty(map) {
    if (map == null) {
        return true;
    }

    for (var k in map) {
        if (map.hasOwnProperty(k)) {
            let val = map[k];
            if (val !== undefined && val !== null && val !== false && val !== "") {
                return false;
            }
        }
    }
    return true;
}

function isNotEmpty(map) {
    return !isEmpty(map);
}

const UiMap = {
    isEmpty,
    isNotEmpty,
};

exports.UiMap = UiMap;