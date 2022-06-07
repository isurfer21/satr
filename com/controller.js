// @file controller.js
const model = require('./model');
const Endec = require('./endec');
const Erratum = require('./erratum');
const AuthBearer = require('./auth-bearer');
const BadgerClient = require('./badger-client');
const BoltClient = require('./bolt-client');

class Controller {
    constructor() {
        this.portion = 'Controller';
    }
    async subscribe(request, reply) {
        // console.log('Controller::subscribe, \nReqHeader:', request.headers, '\nReqBody:', request.body, '\nReqParams:', request.params);
        const endec = new Endec(model.config.cipher);
        let expiry = new Date();
        expiry.setFullYear(expiry.getFullYear() + 1);
        let subscriptionKey = {
            expiry: expiry.toISOString(),
            bucket: request.params.bucket
        };
        let isBearerTokenValid,
            authBearer = new AuthBearer(model.config.account);
        try { isBearerTokenValid = authBearer.match(request); } catch(err) {
            reply.code(401).send(err);
        }
        if (!!isBearerTokenValid) {
            switch (model.config.database.adopt) {
                case 'badger':
                    let badgerClient = new BadgerClient(request);
                    try { await badgerClient.createBucket(); } catch (err) {
                        reply.code(401).send(err);
                    }
                    break;
                case 'bolt':
                    let boltClient = new BoltClient(request);
                    try { await boltClient.createBucket(); } catch (err) {
                        reply.code(401).send(err);
                    }
                    break;
                case 'skytable':
                    break;
                default:
                    reply.code(500).send(new Erratum('Unadopted database', this.portion));
            }
            try {
                const payload = {
                    status: 'ok',
                    subscriptionKey: endec.encrypt(JSON.stringify(subscriptionKey))
                };
                reply.code(200).send(payload);
            } catch (err) {
                reply.code(401).send(new Erratum(err, this.portion));
            }
        }
    }
    async createSession(request, reply) {
        // console.log('Controller::createSession, \nReqHeader:', request.headers, '\nReqBody:', request.body, '\nReqParams:', request.params);
        let payload = {};
        switch (model.config.database.adopt) {
            case 'badger':
                let badgerClient = new BadgerClient(request);
                try { await badgerClient.createKey(); } catch (err) {
                    reply.code(401).send(err);
                }
                payload.status = 'ok';
                break;
            case 'bolt':
                let boltClient = new BoltClient(request);
                try { await boltClient.createKey(); } catch (err) {
                    reply.code(401).send(err);
                }
                payload.status = 'ok';
                break;
            case 'skytable':
                break;
            default:
                reply.code(500).send(new Erratum('Unadopted database', this.portion));
        }
        reply.code(200).send(payload);
    }
    async readSession(request, reply) {
        console.log('Controller::readSession, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        reply.code(200).send(payload);
    }
    async updateSession(request, reply) {
        console.log('Controller::updateSession, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        reply.code(200).send(payload);
    }
    async deleteSession(request, reply) {
        console.log('Controller::deleteSession, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        reply.code(200).send(payload);
    }
}

module.exports = new Controller();