const axios = require('axios');

async function main() {

    let uid = (new Date()).valueOf();

    const config = {
        method: 'POST',
        url: `http://127.0.0.1:3000/session/S${uid}`,
        headers: {
            'Content-Type': 'application/json',
            'sourcechannel': 'trial'
        },
        data: {
            'username': 'John Doe',
            'email': 'john.doe@email.com'
        }
    };

    try {
        let response = await axios(config);
        console.log(response.request._header);
        console.log(response.data);
    } catch (err) {
        console.error(err.message);
        if (!!err.response) {            
            console.error(err.response.request._header);
            console.error(err.response.data);
        }
    }
}

main();