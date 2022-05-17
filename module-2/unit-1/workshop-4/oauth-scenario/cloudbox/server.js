const express = require('express')
const cors = require('cors')
const { files, users, clients } = require('./db')
const auth = require('basic-auth')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/api/oauth2/auth', (req, res) => {
    // TODO:
    // Send back a html form requesting the username and password
    // The form should POST this to the '/api/oauth2/auth/code'
    // along with the rest of the query params sent from the client app (client_id, redirect_uri, etc)
})

app.post('/api/oauth2/auth/code', (req,res) => {
    // TODO:
    // Check the client_id is valid
    // Authenticate the user with their username and password
    // If authenticated, generate a random code.
    // Store this code in the "code" property of the client.
    // Redirect to the redirect_uri with the ?code=
})

app.post('/api/oauth2/token', (req, res) => {
    res.redirect
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

app.listen(5000, () => { console.log('Listening on port 5000') })