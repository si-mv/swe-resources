require('dotenv').config()
const express = require('express')
const auth = require('basic-auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

// bcrypt usage:
// async function logHash (plaintext) {
//     const h = await bcrypt.hash(plaintext, 10)
//     console.log(h)
// }
// logHash('Potato23')
// 
// or in node interactive terminal:
// require('bcrypt').hashSync('Potato23', 10)

// Generate secret key in node interactive terminal:
// require('crypto').randomBytes(64).toString('hex')

// DATABASE
const users = [
    {
        username: 'nimonian',
        hashedPass: '$2b$10$qCFeaN72SBfuf/B5DAgqq.Kv7p1okCvdjziyH9FjTpGDmIV2eOQVO'
    },
    {
        username: 'jerry',
        hashedPass: '$2b$10$Wpbig8B9hgmSAeyh0bNY.e9.z/uE2b7wJdtHAS/Vp90AjqUBHVgEG'
    }
]

const files = [
    {
        owners: ['nimonian', 'jerry'],
        content: 'I shot the sheriff'
    },
    {
        owners: ['nimonian'],
        content: 'but I did not shoot the deputy'
    },
    {
        owners: ['jerry'],
        content: 'ooh ooh ooh'
    }
]

// MIDDLEWARES
// authenticate is used on any end point which is protected by username and password
// (v1 of api)
async function authenticate (req, res, next) {
    const user = auth(req)
    const userEntry = users.find(u => u.username === user.name)
    if (!userEntry) {
        return res.status(404).send({ msg: 'User does not exist.' })
    }
    
    const authenticated = await bcrypt.compare(user.pass, userEntry.hashedPass)
    if (!authenticated) {
        return res.status(401).send({ msg: 'Password is incorrect.' })
    }

    next()

}

// authorize is used on any endpoint which is protected by a jwt auth token
// (v2 of api)
async function authorize (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).send({ msg: 'No credentials found.' })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send({ msg: 'Invalid access token.' })
        req.username = user.name
        next()
    })
}

// API
// V1: an endpoint protected by basic auth (username + password)
app.get('/api/files/:username', authenticate, async (req,res) => {
    const user = auth(req)
    const userFiles = files.filter(f => f.owners.includes(user.name))
    return res.status(200).send({
        msg: `${userFiles.length} files returned`,
        files: userFiles
    })
})

// V2: an endpoint protected by jwt token
app.get('/api/v2/files/:username', authorize, (req, res) => {
    if (req.username) {
        const userFiles = files.filter(f => f.owners.includes(req.username))
        return res.status(200).send({
            msg: `${userFiles.length} files returned`,
            files: userFiles
        })
    } else {
        res.status(401).send({ msg: 'No username provided.' })
    }
})

// to use V2 endpoint, users must log in with basic auth first
app.post('/api/login', authenticate, (req, res) => {
    const user = auth(req)
    const accessToken = jwt.sign({ name: user.name, foo: 'bar' }, process.env.ACCESS_TOKEN_SECRET)
    res.send({ accessToken })
})

// server go brrrrrr
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
