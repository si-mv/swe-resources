const express = require('express')
const cors = require('cors')
const adjectives = require('./assets/adjectives.json')
const nouns = require('./assets/nouns.json')

const app = express()
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello from the random app!!')
})

app.get('/random', (req, res) => {
  const adjective = adjectives[Math.floor( Math.random()*adjectives.length )]
  const noun = nouns[Math.floor( Math.random()*nouns.length )]
  res.send(`${adjective} ${noun}`)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Server listening on port ${PORT}`) })
