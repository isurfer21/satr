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
        this.subscribe = this.subscribe.bind(this);
        this.unsubscribe = this.unsubscribe.bind(this);
        this.createSession = this.createSession.bind(this);
        this.readSession = this.readSession.bind(this);
        this.updateSession = this.updateSession.bind(this);
        this.deleteSession = this.deleteSession.bind(this);
    }
    async subscribe(request, reply) {
        console.log('Controller::subscribe, \nReqHeader:', request.headers, '\nReqBody:', request.body, '\nReqParams:', request.params);
        const endec = new Endec(model.config.cipher);
        let isBearerTokenValid,
            authBearer = new AuthBearer(model.config.account);
        try { isBearerTokenValid = authBearer.match(request); } catch (err) {
            reply.code(401).send(new Erratum(err.message, this.portion));
            return;
        }
        if (!!isBearerTokenValid) {
            if (!!request.body.expiry) {
                let expiry;
                try { expiry = new Date(request.body.expiry); } catch (err) {
                    reply.code(500).send(new Erratum(err.message, this.portion));
                    return;
                }
                if (expiry instanceof Date && !isNaN(expiry)) {
                    const subscriptionKey = {
                        expiry: expiry.toISOString(),
                        bucket: request.params.bucket
                    };
                    let concealedSubscriptionKey;
                    try { concealedSubscriptionKey = endec.encrypt(JSON.stringify(subscriptionKey)); } catch (err) {
                        reply.code(401).send(new Erratum(err.message, this.portion));
                        return;
                    }
                    let retort;
                    switch (model.config.database.adopt) {
                        case 'badger':
                            let badgerClient = new BadgerClient(request);
                            try { retort = await badgerClient.createBucket(); } catch (err) {
                                reply.code(401).send(new Erratum(err.message, this.portion));
                                return;
                            }
                            break;
                        case 'bolt':
                            let boltClient = new BoltClient(request);
                            try { retort = await boltClient.createBucket(); } catch (err) {
                                reply.code(401).send(new Erratum(err.message, this.portion));
                                return;
                            }
                            break;
                        case 'skytable':
                            break;
                        default:
                            reply.code(500).send(new Erratum('Unadopted database', this.portion));
                            return;
                    }
                    if (!!retort) {
                        let payload = {
                            status: retort.status,
                            statusCode: retort.result.status,
                            statusText: retort.result.statusText,
                            subscriptionKey: concealedSubscriptionKey,
                            data: retort.result.data
                        };
                        reply.code(retort.result.status).send(payload);
                    } else {
                        reply.code(401).send(new Erratum('No response from database', this.portion));
                        return;
                    }
                } else {
                    reply.code(401).send(new Erratum('Invalid expiry date', this.portion));
                    return;
                }
            } else {
                reply.code(401).send(new Erratum('Missing expiry in request body', this.portion));
                return;
            }
        }
    }
    async unsubscribe(request, reply) {
        // console.log('Controller::unsubscribe, \nReqHeader:', request.headers, '\nReqBody:', request.body, '\nReqParams:', request.params);
        const endec = new Endec(model.config.cipher);
        let isBearerTokenValid,
            authBearer = new AuthBearer(model.config.account);
        try { isBearerTokenValid = authBearer.match(request); } catch (err) {
            reply.code(401).send(new Erratum(err.message, this.portion));
            return;
        }
        console.log(this.portion)
        if (!!isBearerTokenValid) {
            let retort;
            switch (model.config.database.adopt) {
                case 'badger':
                    let badgerClient = new BadgerClient(request);
                    try { retort = await badgerClient.deleteBucket(); } catch (err) {
                        reply.code(401).send(new Erratum(err.message, this.portion));
                        return;
                    }
                    break;
                case 'bolt':
                    let boltClient = new BoltClient(request);
                    try { retort = await boltClient.deleteBucket(); } catch (err) {
                        reply.code(401).send(new Erratum(err.message, this.portion));
                        return;
                    }
                    break;
                case 'skytable':
                    break;
                default:
                    reply.code(500).send(new Erratum('Unadopted database', this.portion));
                    return;
            }
            if (!!retort) {
                let payload = {
                    status: retort.status,
                    statusCode: retort.result.status,
                    statusText: retort.result.statusText,
                    subscriptionKey: concealedSubscriptionKey,
                    data: retort.result.data
                };
                reply.code(retort.result.status).send(payload);
            } else {
                reply.code(401).send(new Erratum('No response from database', this.portion));
                return;
            }
        }
    }
    async createSession(request, reply) {
        // console.log('Controller::createSession, \nReqHeader:', request.headers, '\nReqBody:', request.body, '\nReqParams:', request.params);
        let retort;
        switch (model.config.database.adopt) {
            case 'badger':
                let badgerClient = new BadgerClient(request);
                try { retort = await badgerClient.createKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'bolt':
                let boltClient = new BoltClient(request);
                try { retort = await boltClient.createKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'skytable':
                break;
            default:
                reply.code(500).send(new Erratum('Unadopted database', this.portion));
                return;
        }
        if (!!retort) {
            let payload = {
                status: retort.status,
                statusCode: retort.result.status,
                statusText: retort.result.statusText,
                subscriptionKey: concealedSubscriptionKey,
                data: retort.result.data
            };
            reply.code(retort.result.status).send(payload);
        } else {
            reply.code(401).send(new Erratum('No response from database', this.portion));
            return;
        }
    }
    async readSession(request, reply) {
        console.log('Controller::readSession, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        let retort;
        switch (model.config.database.adopt) {
            case 'badger':
                let badgerClient = new BadgerClient(request);
                try { retort = await badgerClient.readKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'bolt':
                let boltClient = new BoltClient(request);
                try { retort = await boltClient.readKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'skytable':
                break;
            default:
                reply.code(500).send(new Erratum('Unadopted database', this.portion));
                return;
        }
        if (!!retort) {
            let payload = {
                status: retort.status,
                statusCode: retort.result.status,
                statusText: retort.result.statusText,
                subscriptionKey: concealedSubscriptionKey,
                data: retort.result.data
            };
            reply.code(retort.result.status).send(payload);
        } else {
            reply.code(401).send(new Erratum('No response from database', this.portion));
            return;
        }
    }
    async updateSession(request, reply) {
        console.log('Controller::updateSession, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        let retort;
        switch (model.config.database.adopt) {
            case 'badger':
                let badgerClient = new BadgerClient(request);
                try { retort = await badgerClient.updateKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'bolt':
                let boltClient = new BoltClient(request);
                try { retort = await boltClient.updateKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'skytable':
                break;
            default:
                reply.code(500).send(new Erratum('Unadopted database', this.portion));
                return;
        }
        if (!!retort) {
            let payload = {
                status: retort.status,
                statusCode: retort.result.status,
                statusText: retort.result.statusText,
                subscriptionKey: concealedSubscriptionKey,
                data: retort.result.data
            };
            reply.code(retort.result.status).send(payload);
        } else {
            reply.code(401).send(new Erratum('No response from database', this.portion));
            return;
        }
    }
    async deleteSession(request, reply) {
        console.log('Controller::deleteSession, \nReqHeader:', request.headers, '\nReqBody:', request.body);
        let retort;
        switch (model.config.database.adopt) {
            case 'badger':
                let badgerClient = new BadgerClient(request);
                try { retort = await badgerClient.deleteKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'bolt':
                let boltClient = new BoltClient(request);
                try { retort = await boltClient.deleteKey(); } catch (err) {
                    reply.code(401).send(new Erratum(err.message, this.portion));
                    return;
                }
                break;
            case 'skytable':
                break;
            default:
                reply.code(500).send(new Erratum('Unadopted database', this.portion));
                return;
        }
        if (!!retort) {
            let payload = {
                status: retort.status,
                statusCode: retort.result.status,
                statusText: retort.result.statusText,
                subscriptionKey: concealedSubscriptionKey,
                data: retort.result.data
            };
            reply.code(retort.result.status).send(payload);
        } else {
            reply.code(401).send(new Erratum('No response from database', this.portion));
            return;
        }S
    }
}

module.exports = new Controller();