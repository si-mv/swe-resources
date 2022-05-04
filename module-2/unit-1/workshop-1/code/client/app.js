const axios = require('axios')

const fetchMembers = async () => {
    try {
        const response = await axios('http://localhost:5000/api/members')
        const data = response.data
        console.log(data)
    } catch (error) {
        console.log(error)
    }
}

// fetchMembers()

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

// fetchMember(2)

const addMember = async (member) => {
    try {
        const response = await axios.post('http://localhost:5000/api/members', member)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}

// addMember({ name: 'Nina Simone' })
// fetchMembers()

const updateMember = async (id, data) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/members/${id}`, data)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}

// updateMember(1, { name: 'Bobby Coltrane' })
// fetchMembers()

const deleteMember = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:5000/api/members/${id}`)
        console.log(response.data)
    } catch (error) {
        console.log(error.response.data)
    }
}

// deleteMember(1)
// fetchMembers()
