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
    }

    getBaseUrl() {
        const protocol = (this.config.ssl) ? 'https' : 'http';
        return `${protocol}://${this.config.host}:${this.config.port}`;
        return baseUrl;
    }
    getBucketUrl() {
        if (!!this.request.params.bucket) {
            return `${this.baseUrl}/${this.request.params.bucket}`;
        } else {
            throw new Error('Missing bucket');
        }
    }
    getKeyUrl() {
        if (!!this.request.params.bucket) {
            if (!!this.request.params.key) {
                return `${this.baseUrl}/${this.request.params.bucket}/${this.request.params.key}`;
            } else {
                throw new Error('Missing bucket');
            }
        } else {
            throw new Error('Missing key');
        }
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
            throw new Error(err);
        }
        const payload = {
            status: 'ok',
            result: response
        };
        return payload;
    }

    async createBucket() {
        try {
            let bucketUrl = this.getBucketUrl();
            console.log('BadgerClient::createBucket, bucketUrl:', bucketUrl);
            return await this.query(bucketUrl, 'post');
        } catch (err) {
            throw new Erratum(err.message, this.portion);
        }
    }
    async deleteBucket() {
        try {
            let bucketUrl = this.getBucketUrl();
            console.log('BadgerClient::deleteBucket, bucketUrl:', bucketUrl);
            return await this.query(bucketUrl, 'delete');
        } catch (err) {
            throw new Erratum(err.message, this.portion);
        }
    }

    async createKey() {
        try {
            let keyUrl = this.getKeyUrl();
            console.log('BadgerClient::createKey, keyUrl:', keyUrl);
            return await this.query(keyUrl, 'put');
        } catch (err) {
            throw new Erratum(err.message, this.portion);
        }
    }
    async readKey() {
        try {
            let keyUrl = this.getKeyUrl();
            console.log('BadgerClient::readKey, keyUrl:', keyUrl);
            return await this.query(keyUrl, 'get');
        } catch (err) {
            throw new Erratum(err.message, this.portion);
        }
    }
    async updateKey() {
        try {
            let keyUrl = this.getKeyUrl();
            console.log('BadgerClient::updateKey, keyUrl:', keyUrl);
            return await this.query(keyUrl, 'put');
        } catch (err) {
            throw new Erratum(err.message, this.portion);
        }
    }
    async deleteKey() {
        try {
            let keyUrl = this.getKeyUrl();
            console.log('BadgerClient::deleteKey, keyUrl:', keyUrl);
            return await this.query(keyUrl, 'delete');
        } catch (err) {
            throw new Erratum(err.message, this.portion);
        }
    }
}

module.exports = BadgerClient;