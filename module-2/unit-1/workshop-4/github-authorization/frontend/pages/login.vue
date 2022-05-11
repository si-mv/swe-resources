<template>
    <div>
        <h1>Login</h1>
        <a class="button" :href="url" target="_self">
            Login with GitHub
        </a>
    </div>
</template>

<script>
export default {
    data () {
        return {
            client_id: '153bdd05c9d2e832cac9',
            scopes: 'gist,repo'
        }
    },

    computed: {
        url () {
            let u = `https://github.com/login/oauth/authorize`
            u += `?client_id=${this.client_id}`
            u += `&scopes=${this.scopes}`
            return u
        }
    },

    methods: {
        login () {
            window.open(this.url, '_self')
        }
    }
}
</script>