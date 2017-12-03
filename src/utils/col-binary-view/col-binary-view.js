
// function binarySearch(getValAt, val, limitFrom, limitTo) {
//     var mid = Math.floor(limitFrom + (limitTo-limitFrom) / 2);
//     let valAtMid = getValAt(mid);
//     console.log(JSON.stringify({limitFrom, limitTo, mid, valAtMid, val}));
//
//     if (valAtMid === val) {
//         console.log('match', getValAt(mid), val);
//         return mid;
//     } else if (valAtMid < val) {
//         console.log('mid lower');
//         if (limitTo === limitFrom + 1) {
//             return limitFrom;
//         }
//         return binarySearch(getValAt, val, mid + 1, limitTo);
//     } else if (valAtMid > val) {
//         console.log('mid higher');
//         if (limitTo === limitFrom + 1) {
//             return mid;
//         }
//         return binarySearch(getValAt, val, limitFrom, mid);
//     } else {
//         console.log('not here', val);
//         return -1;
//     }
//
// }

function binarySearch(ar, el, compare_fn) {
    var m = 0;
    var n = ar.length - 1;
    while (m <= n) {
        var k = (n + m) >> 1;
        var cmp = compare_fn(el, ar[k]);
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
const ColBinaryView = {
    createColBinaryView(col, getVal = (e=>e)) {

        function search(e) {
            return binarySearch(col, e, (e1, e2) => getVal(e1) - getVal(e2));
        }
        function insertIndex(e) {
            let s = search(e);
            return s >= 0 ? s : -s-1;
        }

        return {
            insert(e) {
                let ii = insertIndex(e);
                col.splice(ii, 0, e);
            },
            search,
            col() {
                return col;
            }
        };
    }
};

exports.ColBinaryView = ColBinaryView;

