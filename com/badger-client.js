const axios = require('axios');
const model = require('./model');
const Endec = require('./endec');
const Erratum = require('./erratum');

class BadgerClient {
    constructor(request) {
        // console.log('BadgerClient::constructor', config);
        this.portion = 'BadgerClient';
        this.config = model.config.database;
        this.request = request;
        this.baseUrl = this.getBaseUrl();
        this.bucketUrl = this.getBucketUrl();
        this.keyUrl = this.getKeyUrl();
    }

    getBaseUrl() {
        const protocol = (this.config.ssl) ? 'https' : 'http';
        const baseUrl = `${protocol}://${this.config.host}:${this.config.port}`;
        return baseUrl;
    }
    getBucketUrl() {
        return `${this.baseUrl}/${this.request.params.bucket}`;
    }
    getKeyUrl() {
        return `${this.baseUrl}/${this.request.params.bucket}/${this.request.params.key}`;
    }

    async query(link, mode) {
        const config = {
            method: mode,
            url: link,
            headers: {
                ...this.request.headers
            },
            data: this.request.body
        };
        let response;
        try { response = await axios(config); } catch (err) {
            reply.code(500).send(new Erratum(err, this.portion));
        }
        const payload = {
            status: 'ok',
            result: response
        };
        return payload;
    }

    async createBucket() {
        return await this.query(this.bucketUrl, 'post');
    }
    async deleteBucket() {
        return await this.query(this.bucketUrl, 'delete');
    }

    async createKey() {
        return await this.query(this.keyUrl, 'put');
    }
    async readKey() {
        return await this.query(this.keyUrl, 'get');
    }
    async updateKey() {
        return await this.query(this.keyUrl, 'put');
    }
    async deleteKey() {
        return await this.query(this.keyUrl, 'delete');
    }
}

module.exports = BadgerClient;