require('dotenv').config()
const app = require('express')()
const cors = require('cors')
const axios = require('axios')

app.use(cors())

app.get('/', (req, res) => {
    res.send(`
        Hello from the GitGud server!
    `)
})

app.get('/auth/github/callback', async (req, res) => {
    const code = req.query.code
    try {   
            let url = 'https://github.com/login/oauth/access_token'
            url += `?client_id=${process.env.CLIENT_ID}`
            url += `&client_secret=${process.env.CLIENT_SECRET}`
            url += `&code=${code}`
            const tokenResponse = await axios.post(url, {}, {
            headers: {
                'Accept': 'application/json'
            }
        })
        res.send( tokenResponse.data )
    } catch (err) {
        res.status(500).send(err)
    }
})

app.listen(5000, () => { console.log('Listening on port 5000') })
