const RegexUtil = {};

RegexUtil.each = function(exp, str, func) {
    var regExp = typeof exp == "string" ? new RegExp(exp, "g") : exp;
    for (var match;(match=regExp.exec(str)) != null;) {
        func(match);
    }
};
RegexUtil.replaceAll = function(str, exp, replace) {

    if (typeof replace == "string") {
        var replaceStr = replace;
        replace = function(m) {
            return RegexUtil.replaceAll(replaceStr, "\\$(\\d+)", function(m1) {
                return m[1*m1[1]];
            });
        };
    }

    var result = "";

    for (;;) {
        var m = new RegExp(exp).exec(str);
        if (m != null) {
            result += str.substring(0, m.index);
            result += replace(m);
            str = str.substring(m.index + m[0].length);
        } else {
            return result + str;
        }
    }
};

exports.RegexUtil = RegexUtil;