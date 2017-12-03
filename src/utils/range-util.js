const RangeUtil = {
    conflict(r1, r2) {
        if (r1.from >= r2.to) {
            return false;
        }
        if (r1.to <= r2.from) {
            return false;
        }
        return true;
    },
    length(range) {
        return range.to-range.from;
    },
    equals(r1, r2) {
        if (r1 == null) {
            return r2 == null;
        } else if (r2 == null) {
            return false;
        }
        return r1.from == r2.from && r1.to == r2.to;
    }
};

exports.RangeUtil = RangeUtil;