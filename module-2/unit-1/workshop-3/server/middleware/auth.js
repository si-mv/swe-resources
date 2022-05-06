const auth = require('basic-auth')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../data/users')
require('dotenv').config()

let refreshTokens = []

// If authenticate middleware is used, then Authorization: Basic header
// must contain a correct username and password combination to proceed
async function authenticate (req, res, next) {
    const user = auth(req)
    const userEntry = users.find(u => u.username === user.name)
    if (!userEntry) {
        return res.status(404).send({ msg: 'User does not exist.' })
    }
    const authenticated = await bcrypt.compare(user.pass, userEntry.password)
    if (!authenticated) {
        return res.status(401).send({ msg: 'Password is incorrect.' })
    }
    req.user = user
    next()
}

// If authorize middleware is used, then Authorization: Bearer header
// must contain a valid json web token to proceed
function authorize (req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1] // Get the jwt from the header
    if (!token) { return res.status(401).send({ msg: 'User not authenticated.' }) }
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = user
        next()
    } catch (error) {
        return res.status(403).send(error)
    }
}

function login (req, res, next) {
    const accessToken = jwt.sign({ username: req.user.name }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
    const refreshToken = jwt.sign({ username: req.user.name }, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.send({ accessToken, refreshToken })
}

function refresh (req, res, next) {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(401).send({ msg: 'No refresh token found.' })
    if (!refreshTokens.includes(refreshToken)) return res.status(403).send({ msg: 'Invalid refresh token.' })
    try {
        const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        const accessToken = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '20s' })
        res.send({ accessToken })
    } catch (error) {
        res.status(403).send({ msg: 'Invalid refresh token.' })
    }
}

function logout (req, res, next) {
    refreshTokens = refreshTokens.filter(t => t !== req.body.token)
    res.status(200).send({ msg: 'Successfully logged out.' })
}

module.exports = { authorize, authenticate, login, refresh, logout }
