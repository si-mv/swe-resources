# Teaching Notes



## Set up backend

Install dependencies:
```
mkdir server
cd server
npm install express // express is the backend framework
```

Let's create `main.js` and add some code there to kick start our express app!
```js
const express = require('express')

const app = express()

const PORT = process.env.PORT || 5000 // The env.PORT would get used in prod

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
```

Now if we run
```
node main.js
```
we will have a server running on port 5000.

Now our backend is essentially working, we want to actually interact with it, so let's add
```js
// const express = require('express')

// const app = express()

app.get('/', (req,res) => {
    res.send('<h1>Hello world!</h1>')
})

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
```
In order to see the change, we need to restart the server and visit `http://localhost:5000`

As we don't want to restart the server all the time, let's use nodemon:
```
npm install nodemon --save-dev
```
Now if we start our server with
```
nodemon main.js
```
we don't need to restart all the time.

Last but of setup, let's add to our scripts
```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node main",
    "dev": "nodemon main"
  },
```
The `"start"` command would probably be used in prod, but for dev we well do `npm run dev`.

## Add a middleware

Let's add a function `logRequest` in a `middleware` directory to log on the server whenever a request is made:
```js
const logRequest = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}:${Date.now()}`)
    next()
}

module.exports logRequest
```
and we will use it in `main.js`
```js
const logRequest = require('./middleware/logRequest')
app.use(logRequest)
```

## Serving HTML files

If we want to send back html instead of a string, we can make a folder called `public` and grab it from there. Let's put an `index.html` file in public:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>HTML 5 Boilerplate</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
	<!-- <script src="index.js"></script> -->
    <h1>Hello from public!</h1>
  </body>
</html>
```
and go back to our main `main.js` file and make some changes:
```js
const path = require('path') // So we don't need to manually build addresses for stuff!
// Without using path, our app would break when we move it to another machine because the absolute location would be different

// // This sends back the file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

## Serving from static

But we don't want to write a return function for every single page! So we use a built-in functionality of express called `static` which basically builds this for us:
```js
// const express = require('express')
// const path = require('path')

// const app = express()

// // .use basically introduces a middleware, we'll talk about it later
app.use(express.static(path.join(__dirname, 'public')))

// const PORT = process.env.PORT || 5000

// app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
```
We can also add our CSS to the public folder.

## Making an API

We can make our API by telling express what to do when a request is made to one of our endpoints:
```js
members = [
    {
        id: 1,
        name: 'Alice Coltrane'
    },
    {
        id: 2,
        name: 'Louis Armstrong'
    }
]

app.get('/api/members', (req,res) => {
    res.json(members) // We don't need JSON.Stringify(), res.json() does it for us
})
```

## Request from the frontend

Let's make a dir for frontend and `npm init`. We should install `axios`, make sure that `"type: module"` is in the `package.json` add an `app.js` file to it.
```js
import axios from 'axios'

const fetchMembers = async () => {
    const response = await axios('http://localhost:5000/api/members')
    const data = response.data
    console.log(data)
}

fetchMembers()
```

## Fetch a member by id with params

On our server, we create an endpoint that accepts params:
```js
app.get('/api/members/:id', (req, res) => {
    res.json(members.find(m => m.id == req.params.id)) // Alternatively, m.id === parseInt(req.params.id)
})
```
and we use it from the frontend like so:
```js
const fetchMember = async (id) => {
    const response = await axios(`http://localhost:5000/api/members/${id}`)
    const data = response.data
    console.log(data)
}

fetchMember(1)
```

## Handle a 400 error

What if a user with `req.params.id` isn't found? We can add response codes to our responses like this:
```js
app.get('/api/members/:id', (req, res) => {
    const member = members.find(m => m.id == req.params.id) // Alternatively, m.id === parseInt(req.params.id)
    if (member) {
        res.status(200).json(member)
    } else {
        res.status(400).json({ msg: `No member with id ${req.params.id}` })
    }
})
```
and then handle it on the frontend like this
```js
const fetchMember = async (id) => {
    try {
        const response = await axios(`http://localhost:5000/api/members/${id}`)
        const {data, status, statusText} = response
        console.log(`${status} ${statusText}`)
        console.log(data)
    } catch (error) {
        const response = error.response
        const {data, status, statusText} = response
        console.log(`${status} ${statusText}`)
        console.log(data)
    }
}
```

## Extract the api to a different directory with router

We can remove the members functions to `api/members.js` and use router to access them:
```js
const express = require('express')
const router = express.Router()
const members = require('../models/Members')

router.get('/', (req, res) => {
    res.json(members)
})

router.get('/:id', (req, res) => {
    const member = members.find(m => m.id == req.params.id) // Alternatively, m.id === parseInt(req.params.id)
    if (member) {
        res.status(200).json(member)
    } else {
        res.status(400).json({ msg: `No member with id ${req.params.id}` })
    }
})

module.exports = router
```
Then in server `index.js` we need
```js
app.use('/api/members', require('./api/members'))
```
This will take any request to `'api/members'` and map it to the `router.blah()` endpoints in `members.js`

## Add a member to the members array

In the frontend, we can make a post request with Axios:
```js
const addMember = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/members', {
            name: 'Eta James'
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}
```
and we handle this in the backend like so:
```js
router.post('/', (req,res) => {
    const newMember = {
        id: nanoid.nanoid(),
        name: req.body.name
    }
    if (!newMember.name) {
        return res.status(400).json({ msg: 'Please include a name' })
    }
    members.push(newMember)
    res.status(201).json({ ...newMember, msg: 'New user added successfully.'})
})
```

## Update a user on the server

In the frontend, we want:
```js
const updateMember = async (id) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/members/${id}`, {
            name: 'Bobby Coltrane'
        })
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}
```
and in the backend:
```js
router.put('/:id', (req,res) => {
    let found = false
    members.forEach(m => {
        if (m.id == req.params.id) {
            found = true
            Object.assign(m, req.body)
        }
    })
    if (found) {
        res.json({ msg: 'User updated successfully.' })
    } else {
        res.status(400).json({ msg: `User with id ${req.params.id} cannot be found.` })
    }
})
```

## Delete a member

On the frontend:
#### **`app.js`**
```js
const deleteMember = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/members/${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}
```
And on the backend:
```js
router.delete('/:id', (req,res) => {
    const member = members.find(m => m.id == req.params.id)
    if (member) {
        members = members.filter(m => m.id != req.params.id)
        res.json({ msg: 'User deleted successfully' })
    } else {
        res.status(404).json({ msg: `Use with id ${req.params.id} cannot be found.` })
    }
})
```

## Add a cache

In `main.js` we can use an npm package to implement a simple cache:
```js
const apicache = require('apicache')
let cache = apicache.middleware
app.use(cache('5 minutes'))
```
