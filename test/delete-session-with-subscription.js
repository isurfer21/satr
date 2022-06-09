const axios = require('axios');

async function main() {

    let uid = 'S1654669025766';

    const config = {
        method: 'DELETE',
        url: `http://127.0.0.1:3000/session/${uid}`,
        headers: {
            'Content-Type': 'application/json',
            'subscriptionkey': 'aZEQG0Hr8RML2nz8OdZRu2leBDjywvP7CBW6kpU6C2gmOfrLolLgONteNG9OX0Dl0r5Eh5F8sSzAG1aPpDxVGA=='
        },
        data: {}
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