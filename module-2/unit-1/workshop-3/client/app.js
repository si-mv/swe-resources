import axios from 'axios'

class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }

    get authToken () {
        return Buffer.from(`${this.username}:${this.password}`, 'utf8').toString('base64')
    }

    async login () {
        try {
            const res = await axios.post('http://localhost:5000/login', {}, {
                headers: {
                    'Authorization': `Basic ${this.authToken}`
                }
            })
            this.accessToken = res.data.accessToken
        } catch (error) {
            console.log(error.response.data)
        }
    }

    async getMoves () {
        try {
            const res = await axios.get('http://localhost:5000/moves', {
                headers: {
                    'Authorization': `Bearer ${this.accessToken}`
                }
            })
            this.moves = res.data
        } catch (error) {
            console.log(error.response.data)
        }
    }
}

const pikachu = new User('pikachu', 'Chuuu999')
await pikachu.login()
await pikachu.getMoves()
console.log(pikachu.moves)