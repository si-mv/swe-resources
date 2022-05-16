const express = require('express')
const cors = require('cors')
const { files, users, clients } = require('./db')
const auth = require('basic-auth')
const jwt = require('jsonwebtoken')

const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/oauth2/auth', (req,res) => {
    // TODO:
    // Make sure the client_id is valid
    // Authenticate the user
    // Generate a random code and add it to the client's `code` property
    // Redirect the user (user res.redirect(url)) to the callback_url with the code as a query param
})

app.post('/api/oauth2/token', (req, res) => {
    // TODO:
    // Make sure the client_secret and code match
    // Generate a jwt and send it back (put useful info in the payload)
    // Make sure to put the token in the user's set of tokens
})

app.get('/api/file/:id', (req, res) => {
    // TODO:
    // ensure the request is authorized by token
    // send the file back
    // Hint: the request contains a jwt, which has the user info in the payload!
})

app.put('/api/file/:id', (req, res) => {
    // TODO:
    // ensure the request is authorized by token
    // apply the appropriate edits
    // send the file back
})