function createString(c, length) {
    let str = "";
    for (let i = 0; i < length; i++) {
        str += c;
    }
    return str;
}

function isEmpty(val) {
    return val == null || val === "";
}

function isNotEmpty(val) {
    return !isEmpty(val);
}

function isBlank(val) {
    return isEmpty(val) || val.replace(/\s/g, "").length == 0;
}

function isNotBlank(str) {
    return !isBlank(str);
}

var Base64 = {
    characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=" ,

    encode: function( string )
    {
        var characters = Base64.characters;
        var result     = '';

        var i = 0;
        do {
            var a = string.charCodeAt(i++);
            var b = string.charCodeAt(i++);
            var c = string.charCodeAt(i++);

            a = a ? a : 0;
            b = b ? b : 0;
            c = c ? c : 0;

            var b1 = ( a >> 2 ) & 0x3F;
            var b2 = ( ( a & 0x3 ) << 4 ) | ( ( b >> 4 ) & 0xF );
            var b3 = ( ( b & 0xF ) << 2 ) | ( ( c >> 6 ) & 0x3 );
            var b4 = c & 0x3F;

            if( ! b ) {
                b3 = b4 = 64;
            } else if( ! c ) {
                b4 = 64;
            }

            result += Base64.characters.charAt( b1 ) + Base64.characters.charAt( b2 ) + Base64.characters.charAt( b3 ) + Base64.characters.charAt( b4 );

        } while ( i < string.length );

        return result;
    } ,

    decode: function( string )
    {
        var characters = Base64.characters;
        var result     = '';

        var i = 0;
        do {
            var b1 = Base64.characters.indexOf( string.charAt(i++) );
            var b2 = Base64.characters.indexOf( string.charAt(i++) );
            var b3 = Base64.characters.indexOf( string.charAt(i++) );
            var b4 = Base64.characters.indexOf( string.charAt(i++) );

            var a = ( ( b1 & 0x3F ) << 2 ) | ( ( b2 >> 4 ) & 0x3 );
            var b = ( ( b2 & 0xF  ) << 4 ) | ( ( b3 >> 2 ) & 0xF );
            var c = ( ( b3 & 0x3  ) << 6 ) | ( b4 & 0x3F );

            result += String.fromCharCode(a) + (b?String.fromCharCode(b):'') + (c?String.fromCharCode(c):'');

        } while( i < string.length );

        return result;
    }
};

const StringUtil = {
    parseQueryString(str) {
        const splitedStr = str.substring(str.indexOf('?')+1).split('&');
        let params = {};

        for (var i = splitedStr.length - 1; i >= 0; i--) {
            const pair = splitedStr[i].split('=');
            params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }

        return params;
    },
    isEmpty,
    isNotEmpty,
    createString,
    equalsIgnoreCase(s1, s2) {
        if (s1 == null) {
            return s2 == null;
        }
        if (s2 == null) {
            return false;
        }

        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
        return s1 == s2;
    },
    padding(str, length) {
        length = length || 2;
        str = ""+str;
        for (;str.length < length;) {
            str = "0" + str;
        }
        return str;
    },
    equalIgnoreCase(s1, s2) {
        if (s1 == s2) {
            return true;
        }
        if (s1 == null || s2 == null) {
            return false;
        }
        return typeof s1 === "string" && typeof s2 === "string" && s1.toLowerCase() === s2.toLowerCase();
    },
    validEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    },
    isBlank,
    isNotBlank,
    isPlural(val) { return val > 1 }, // TODO This should not be in StringUtil
    capitalizeAllFirstLetter(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    },
    upperCaseFirstChar(str) {
        return str[0].toUpperCase() + str.substring(1);
    },
    Base64
};

exports.StringUtil = StringUtil;