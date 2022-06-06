const axios = require('axios');

async function main() {

    const config = {
        method: 'post',
        url: 'http://127.0.0.1:3000/session/S202206070019',
        headers: {
            'Content-Type': 'application/json',
            'subscriptionKey': 'aZEQG0Hr8RML2nz8OdZRuzm+N8/yVK6c9Q490iYBliQ6t8UrbWoJOZ3b5YMSJiqj2BH8Uz04xrMwCe5t4q2xKw=='
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