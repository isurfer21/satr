// @file endec.js
const crypto = require('crypto');

class Endec {
    constructor(config) {
        this.config = config;
        this.encrypt = this.encrypt.bind(this);
        this.decrypt = this.decrypt.bind(this);
    }

    encrypt(plainText) {
        const cipher = crypto.createCipheriv(this.config.algorithm, this.config.key, this.config.iv);
        let encText = cipher.update(plainText, 'utf-8', 'base64');
        encText += cipher.final('base64');
        return encText;
    }

    decrypt(cipherText) {
        const decipher = crypto.createDecipheriv(this.config.algorithm, this.config.key, this.config.iv);
        let decText = decipher.update(cipherText, 'base64', 'utf-8');
        decText += decipher.final('utf8');
        return decText;
    }
}

module.exports = Endec;