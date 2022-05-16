<template>
    <div>
        <h1>Login</h1>
        <!-- 1. User clicks button -->
        <a class="button" :href="url" target="_self">
            Login with GitHub
            <!-- 2. We href to github login with the client_id -->
        </a>
        <!-- 3. Github's login page requests the u:p -->
        <!-- 4. The user inputs it -->
        <!-- 5. The login page posts to github's oauth server -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            client_id: '153bdd05c9d2e832cac9',
            scope: 'gist repo'
        }
    },

    computed: {
        url () {
            let u = `https://github.com/login/oauth/authorize`
            u += `?client_id=${this.client_id}`
            u += `&scope=${this.scope}`
            return u
        }
    }
}
</script>