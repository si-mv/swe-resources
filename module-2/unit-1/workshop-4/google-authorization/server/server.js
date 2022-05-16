const express = require('express')
const cors = require('cors')
require('dotenv').config()
const axios = require('axios')

const app = express()
app.use(cors())
app.use(express.json())

app.post('/auth/google', async (req, res) => {
    const code = req.query.code
    let url=`https://oauth2.googleapis.com/token`
    url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`
    url += `&client_secret=${process.env.GOOGLE_CLIENT_SECRET}`
    url += `&code=${code}`
    url += `&grant_type=authorization_code`
    url += `&redirect_uri=${encodeURIComponent('http://localhost:3000/auth/google/callback')}`
    try {
        const response = await axios.post(url, null)
        res.send(response.data)
    } catch (err) {
        console.log(err)
        res.send({ msg: 'Error!' })
    }
})

app.listen(process.env.PORT, () => { console.log(`Server listening on port ${process.env.PORT}`) })
