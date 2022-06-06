// @file authenticator.js
const model = require('./model');
const Endec = require('./endec');
const Erratum = require('./erratum');

class Authenticator {
    constructor() {
        this.portion = 'Authenticator';
        this.ratify = this.ratify.bind(this);
    }

    async ratify(request, reply) {
        // console.log('Authenticator::ratify, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        if (model.config.cipher.enabled) {
            if (request.headers && request.headers.subscriptionkey) {
                let payload;
                try {
                    const endec = new Endec(model.config.cipher);
                    let retrievedData = endec.decrypt(request.headers.subscriptionkey);
                    payload = JSON.parse(retrievedData);
                } catch (err) {
                    reply.code(401).send(new Erratum("Invalid Subscription Key", this.portion));
                }
                let authStatus;
                if (!!payload && !!payload.expiry && !!payload.bucket) {
                    let today = new Date(),
                        expiry = new Date(payload.expiry);
                    if (expiry > today) {
                        request.params.bucket = payload.bucket;
                    } else {
                        reply.code(401).send(new Erratum("Expired Subscription Key", this.portion));
                    }
                } else {
                    reply.code(401).send(new Erratum("Inapt Subscription Key", this.portion));
                }
            } else {
                reply.code(401).send(new Erratum("Missing Subscription Key", this.portion));
            }
        }
    }
}

module.exports = new Authenticator();