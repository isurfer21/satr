const axios = require('axios');

async function main() {

    let uid = (new Date()).valueOf();

    const config = {
        method: 'post',
        url: `http://127.0.0.1:3000/session/S${uid}`,
        headers: {
            'Content-Type': 'application/json',
            'subscriptionkey': 'aZEQG0Hr8RML2nz8OdZRu2leBDjywvP7CBW6kpU6C2gmOfrLolLgONteNG9OX0Dl0r5Eh5F8sSzAG1aPpDxVGA=='
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
        console.error(err.response.request._header);
        console.error(err.response.data);
    }
}

main();