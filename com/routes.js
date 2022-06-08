// @file routes.js
const Controller = require('./controller');
const Authenticator = require('./authenticator');

class Routes {
    constructor() {
        this.initialize = this.initialize.bind(this);
        this.isAlive = this.isAlive.bind(this);
    }

    isAlive(request, reply) {
        return {
            message: "Welcome to the Satr API"
        };
    }

    async initialize(fastify, options) {
        fastify.get('/live', this.isAlive);
        fastify.post('/subscribe/:bucket', Controller.subscribe);
        fastify.delete('/unsubscribe/:bucket', Controller.unsubscribe);
        fastify.post('/session/:key', { preHandler: Authenticator.ratify }, Controller.createSession);
        fastify.get('/session/:key', { preHandler: Authenticator.ratify }, Controller.readSession);
        fastify.put('/session/:key', { preHandler: Authenticator.ratify }, Controller.updateSession);
        fastify.delete('/session/:key', { preHandler: Authenticator.ratify }, Controller.deleteSession);
    }
}

const routes = new Routes();

module.exports = routes.initialize;