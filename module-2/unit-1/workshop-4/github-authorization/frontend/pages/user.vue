<template>
    <div style="margin: 50px;">
        <h1>Profile</h1>
        <p>Here is the information about your GitHub account!</p>
        <pre>
            {{ user }}
        </pre>
        <button @click="fetchGists">View Gists</button>
        <div v-for="gist in gists" :key="gist.id">
            <h3>
                {{ gist.description }}
            </h3>
            <p>ID: {{ gist.id }}</p>
            <p>Public: {{ gist.public }}</p>
            <button @click="deleteGist(gist.id)">Star</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            user: {},
            gists: [],
            gistID: ''
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
                this.gists = res.data
            } catch (err) {
                console.log(err)
            }
        },

        async starGist (id) {
            const url = `https://api.github.com/gists/${id}/star`
            try {
                const res = await axios.put(url, null, {
                headers: {
                        'Authorization': `token ${this.token}`
                    }
                })
                console.log(res)
            } catch (err) {
                console.log(err)
            }
        }
    },

    async mounted () {
        console.log('Accessing api with token', this.token)
        try {
            // 11. And use it to access private data
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