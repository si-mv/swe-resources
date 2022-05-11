<template>
    <div>
        <h1>Profile</h1>
        <p>Here is the information about your GitHub account!</p>
        <pre>
            {{ user }}
        </pre>
        <button @click="fetchGists">View Gists</button>
        <pre>
            {{ gists }}
        </pre>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            user: {},
            gists: {}
        }
    },

    computed: {
        token () { return localStorage.getItem('github_access_token') }
    },

    methods: {
        async fetchGists () {
            try {
                const res = await axios.get('https://api.github.com/gists', {
                headers: {
                        'Authorization': `token ${this.token}`
                    }
                })
                console.log(res)
                Object.assign(this.gists, res.data)
            } catch (err) {
                console.log(err)
            }
        }
    },

    async mounted () {
        console.log('Accessing api with token', this.token)
        try {
            const res = await axios.get('https://api.github.com/user', {
            headers: {
                    'Authorization': `token ${this.token}`
                }
            })
            Object.assign(this.user, res.data)
        } catch (err) {
            console.log(err)
        }
    }
}
</script>