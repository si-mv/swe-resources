const express = require('express')
const auth = require('basic-auth')
const bcrypt = require('bcrypt')

const app = express()

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

app.get('/api/files/:username', async (req,res) => {
    const user = auth(req)
    const userEntry = users.find(u => u.username === user.name)
    if (!userEntry) {
        return res.status(404).send({ msg: 'User does not exist.' })
    }
    
    const authorized = await bcrypt.compare(user.pass, userEntry.hashedPass)
    if (!authorized) {
        return res.status(401).send({ msg: 'Password is incorrect.' })
    }
    
    const userFiles = files.filter(f => f.owners.includes(user.name))
    return res.status(200).send({
        msg: `${userFiles.length} files returned`,
        files: userFiles
    })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
