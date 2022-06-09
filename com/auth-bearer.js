// @file auth-bearer.js
const crypto = require('crypto');
const Erratum = require('./erratum');

class AuthBearer {
    constructor(config) {
        this.portion = 'AuthBearer';
        this.config = config;
    }
    #extract(request) {
        if (!!request.headers.authorization) {
            return request.headers.authorization.substr('Bearer '.length);
        } else {
            throw new Erratum('Missing authorization bearer-token', this.portion);
        }
    }
    #parse(bearerToken) {
        const bearerTokenPayload = Buffer.from(bearerToken, 'base64').toString('utf8');
        if (bearerTokenPayload.indexOf('|') >= 0) {
            const bearerTokenChunks = bearerTokenPayload.split('|');
            return {
                username: bearerTokenChunks[0],
                secretHash: bearerTokenChunks[1]
            }
        } else {
            throw new Erratum('Invalid authorization bearer-token', this.portion);
        }
    }
    match(request) {
        let bearerToken;
        try { bearerToken = this.#extract(request); } catch (err) {
            throw err;
        }
        let accountInfo;
        try { accountInfo = this.#parse(bearerToken); } catch (err) {
            throw err;
        }
        if (accountInfo.username == this.config.username) {
            let secretHash = this.config.secretHash || crypto.createHash('md5').update(this.config.password).digest('hex');
            if (accountInfo.secretHash == secretHash) {
                return true;
            } else {
                throw new Erratum('Incorrect password in authorization bearer-token', this.portion);
            }
        } else {
            throw new Erratum('Incorrect username in authorization bearer-token', this.portion);
        }
    }
}

module.exports = AuthBearer;