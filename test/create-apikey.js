const axios = require('axios');

async function main() {

    const config = {
        method: 'get',
        url: 'http://127.0.0.1:3000/apikey/trial',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {}
    };

    let response;
    try { response = await axios(config); } catch (err) {
        throw new Error(err);
    }

    console.log(response.request._header);
    console.log(response.data);
}

main();