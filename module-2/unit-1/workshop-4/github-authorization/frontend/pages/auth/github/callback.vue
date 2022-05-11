<template>
    <div>
        <h2>Please wait while we log you in...</h2>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    async mounted () {
        const code = this.$route.query.code
        console.log(code)
        try {
            const res = await axios.get(`http://localhost:5000/auth/github/callback?code=${code}`)
            console.log('Access token given to callback is', res.data.access_token)
            localStorage.setItem('github_access_token', res.data.access_token)
            this.$router.replace('/user')
        } catch (err) {
            console.log(err)
        }
    }
}
</script>