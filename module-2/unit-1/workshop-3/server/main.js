const express = require('express')
const moves = require('./data/moves')
const { authenticate, authorize, login, refresh, logout } = require('./middleware/auth')

const app = express()
app.use(express.json())

app.post('/login', authenticate, login)

app.get('/secrets', authorize, (req, res) => {
    res.send({ msg: `You got the secrets, ${req.user.username}!` })
})

app.get('/moves', authorize, (req, res) => {
    const userMoves = moves.filter(m => m.owners.includes(req.user.username))
    res.send(userMoves)
})

app.post('/refresh', refresh)

app.delete('/logout', logout)

app.listen(5000, () => console.log('Server listening on 5000'))
