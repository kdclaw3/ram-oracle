module.exports = {
    match: function (un, ipw, pw) {
		
        String.prototype.hexEncode = function () {
            var hex, i, result = "";
            for (i = 0; i < this.length; i++) {
                hex = this.charCodeAt(i).toString(16);
                result += ("000" + hex).slice(-2);
            }
            return result;
        };

        var crypto = require("crypto"),
            crypto2 = require("crypto"),
            u = null,
            ml, pl, f, cypher, c, k2, cypher2, c2, hash;

        var s = un + pw;
        var su = s.toUpperCase();

        var sl = su.length;

        for (let i = 0; i < sl; i++) {
            u = u === null ? String.fromCharCode(0) + su[i] : u + String.fromCharCode(0) + su[i];
        }

        ml = ((sl * 2) % 8);

        pl = ml === 0 ? 0 : 8 - ml;

        for (let i = 0; i < pl; i++) {
            u = u + String.fromCharCode(0);
        }

        f = u.hexEncode();
        cipher = crypto.createCipheriv("des-cbc", Buffer.from('0123456789ABCDEF', 'hex'), Buffer.from('0000000000000000', 'hex'));
        cipher.setAutoPadding(false);
        c = cipher.update(f, 'hex', 'hex');

        k2 = c.slice(-16);

        cipher2 = crypto2.createCipheriv("des-cbc", Buffer.from(k2, 'hex'), Buffer.from('0000000000000000', 'hex'));
        cipher2.setAutoPadding(false);
        c2 = cipher2.update(f, 'hex', 'hex');

        hash = c2.slice(-16).toUpperCase();

        if (hash === ipw) {
            return true;
        } else {
            return false;
        }
    }
};
