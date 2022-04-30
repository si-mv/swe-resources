const express = require('express')
const router = express.Router()
let members = require('../data/Members')
const nanoid = require('nanoid')

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
        res.status(404).json({ msg: `User with id ${req.params.id} cannot be found.` })
    }
})

router.delete('/:id', (req,res) => {
    const member = members.find(m => m.id == req.params.id)
    if (member) {
        members = members.filter(m => m.id != req.params.id)
        res.json({ msg: 'User deleted successfully' })
    } else {
        res.status(404).json({ msg: `Use with id ${req.params.id} cannot be found.` })
    }
})

module.exports = router
