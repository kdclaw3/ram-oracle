const crypto = require("crypto");

module.exports = {
	match: function (un, ipw, pw, iv = '0123456789ABCDEF' ) {

		let a = [un, ipw, pw];
		let validateFalse = false;
		for (let i in a) {
			if (typeof a[i] !== 'string' || a[i] === '') {
				console.error(`[RAM ORACLE] ERROR, ${Number(i) + 1} input must be a string actual -> ${a[i]}, returning false.`);
				validateFalse = true;
			}
		}
		if (validateFalse) return false;


		String.prototype.hexEncode = function () {
			let result = '';
			for (let i = 0, l = this.length; i < l; i++) {
				let hex = this.charCodeAt(i).toString(16);
				result += ('000' + hex).slice(-2);
			}
			return result;
		};

		const su = (un + pw).toUpperCase();
		const sl = su.length;
		const ml = ((sl * 2) % 8);
		const pl = ml === 0 ? 0 : 8 - ml;

		let u = '', u2 = '';
		for (let i = 0; i < sl; i++) {
			u += String.fromCharCode(0) + su[i];
		}
		for (let i = 0; i < pl; i++) {
			u += String.fromCharCode(0);
		}

		const f = u.hexEncode();

		let cipher = crypto.createCipheriv("des-cbc", Buffer.from(iv, 'hex'), Buffer.from('0000000000000000', 'hex'));
		cipher.setAutoPadding(false);
		cipher = cipher.update(f, 'hex', 'hex');
		cipher = cipher.slice(-16);

		let cipher2 = crypto.createCipheriv("des-cbc", Buffer.from(cipher, 'hex'), Buffer.from('0000000000000000', 'hex'));
		cipher2.setAutoPadding(false);
		cipher2 = cipher2.update(f, 'hex', 'hex');

		const hash = cipher2.slice(-16).toUpperCase();

		if (hash === ipw) {
			return true;
		} else {
			return false;
		}

	}
};
