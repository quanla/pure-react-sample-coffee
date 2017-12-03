
function binarySearch(ar, key, getKey, compare_fn) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compare_fn(key, getKey(ar[k]));
        if (cmp > 0) {
            m = k + 1;
        } else if(cmp < 0) {
            n = k - 1;
        } else {
            return k;
        }
    }
    return -m - 1;
}

const BinarySearch = {
    get(key, col, getKey) {
        let index = binarySearch(col, key, getKey, (k1, k2) => k1 == k2 ? 0 : k1 > k2 ? 1 : -1);
        if (index < 0) {
            return null;
        }

        return col[index];
    }
};

exports.BinarySearch = BinarySearch;