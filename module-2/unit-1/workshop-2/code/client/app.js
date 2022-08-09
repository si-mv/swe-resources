import axios from 'axios'

// A user class to model someone using the app e.g. in browser
class User {
    constructor (username, password) {
        this.username = username
        this.password = password
        this.accessToken = null
    }

    get token () {
        return Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64')
    }

    get isLoggedIn () {
        return !!this.accessToken
    }

    logout () {
        this.accessToken = null
    }

    async login () {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {}, {
                headers: {
                    'authorization': `Basic ${this.token}`
                }
            })
            this.accessToken = response.data && response.data.accessToken
            return Promise.resolve(response)
        } catch (error) {
            console.log(error)
        }
    }
}

const user1 = new User('nimonian', 'Potato23')
// To get the basic token from the terminal, `node` and then
// Buffer.from('nimonian:Potato23', 'utf8').toString('base64')

// The Basic Auth version (username + password)
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

// The JWT version (with JWT accessToken)
async function fetchUserFiles (user) {
    await user.login()
    try {
        const response = await axios.get(`http://localhost:5000/api/v2/files/${user.username}`, {
            headers: {
                'Authorization': `Bearer ${user.accessToken}`
            }
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.response)
    }
}

fetchUserFiles(user1)
