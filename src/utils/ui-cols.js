
function isEmpty(col) {
    return col == null || col.length == 0 || col.find((e) => e !== undefined && e !== null && e !== false) === undefined;
}

function isNotEmpty(col) {
    return !isEmpty(col);
}

const UiCols = {
    isEmpty,
    isNotEmpty,
};

exports.UiCols = UiCols;