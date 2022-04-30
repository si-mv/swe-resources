const express = require('express')
const path = require('path')
const apicache = require('apicache')
const logRequest = require('./middleware/logRequest')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logRequest)
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/members', require('./api/members'))

let cache = apicache.middleware
app.use(cache('5 minutes'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
