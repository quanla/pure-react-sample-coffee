const UrlUtil = {
    queryString(params) {
        let ret = "";
        _.forEach(params, (v, k)=> {
            if (v == null) {
                return;
            }
            if (ret.length > 0) {
                ret += "&";
            }
            ret += `${k}=${encodeURIComponent(v)}`;
        });
        return ret.length == 0 ? ret : "?" + ret;
    }
};

exports.UrlUtil = UrlUtil;