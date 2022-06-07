const axios = require('axios');
const crypto = require('crypto');

async function main() {

    const username = 'johndoe', 
        password = 'p@sSw0r6';

    let secretHash = crypto.createHash('md5').update(password).digest('hex');    
    let bearerToken = Buffer.from([username, secretHash].join('|'), 'utf8').toString('base64');

    const config = {
        method: 'get',
        url: 'http://127.0.0.1:3000/subscribe/trial',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
        },
        data: {}
    };

    try {
        let response = await axios(config);
        console.log(response.request._header);
        console.log(response.data);
    } catch (err) {
        console.error(err.message);
        console.error(err.response.request._header);
        console.error(err.response.data);
    }
}

main();