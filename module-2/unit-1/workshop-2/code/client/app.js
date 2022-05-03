const axios = require('axios')

class User {
    constructor (username, password) {
        this.username = username
        this.password = password
    }
    get token () {
        return Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64')
    }
}

const user1 = new User('nimonian', 'Potato23')

const fetchSecret = async (user) => {
    try {
        const reponse = await axios.get(`http://localhost:5000/api/files/${user.username}`, {
            headers: {
                'Authorization': `Basic ${user.token}`
            }
        })
        console.log(reponse.data)
    } catch (error) {
        console.log(error.response && error.response.data)
    }
}

fetchSecret(user1)
