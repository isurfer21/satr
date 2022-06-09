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

    async createBucket() {
        try {
            let bucketUrl = this.getBucketUrl();
            return await axios.post(bucketUrl);
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
    async deleteBucket() {
        try {
            let bucketUrl = this.getBucketUrl();
            return await axios.delete(bucketUrl);
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }

    async createKey() {
        try {
            let keyUrl = this.getKeyUrl();
            return await axios.put(keyUrl, this.request.body);
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
    async readKey() {
        try {
            let keyUrl = this.getKeyUrl();
            return await axios.get(keyUrl);
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
    async updateKey() {
        try {
            let keyUrl = this.getKeyUrl();
            return await axios.put(keyUrl, this.request.body);
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
    async deleteKey() {
        try {
            let keyUrl = this.getKeyUrl();
            return await axios.delete(keyUrl);
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
}

module.exports = BadgerClient;