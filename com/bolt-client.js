const axios = require('axios');
const model = require('./model');
const Endec = require('./endec');
const Erratum = require('./erratum');

class BoltClient {
    constructor(request) {
        // console.log('BoltClient::constructor', config);
        this.portion = 'BoltClient';
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
            return `${this.baseUrl}/v1/buckets/${this.request.params.bucket}`;
        } else {
            throw new Error('Missing bucket');
        }
    }
    getKeyUrl() {
        if (!!this.request.params.bucket) {
            if (!!this.request.params.key) {
                return `${this.baseUrl}/v1/buckets/${this.request.params.bucket}/keys/${this.request.params.key}`;
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
            return await axios.post(keyUrl, {
                data: JSON.stringify(this.request.body)
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
    async readKey() {
        try {
            let keyUrl = this.getKeyUrl();
            let result = await axios.get(keyUrl);
            if (!!result && result.status == 200) {
                if (!!result.data && !!result.data.data) {
                    result.data = JSON.parse(result.data.data);
                }
            }
            return result;
        } catch (err) {
            if (!!err.response) return err.response;
            throw new Erratum(err, this.portion);
        }
    }
    async updateKey() {
        try {
            let keyUrl = this.getKeyUrl();
            return await axios.post(keyUrl, {
                data: JSON.stringify(this.request.body)
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
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

module.exports = BoltClient;