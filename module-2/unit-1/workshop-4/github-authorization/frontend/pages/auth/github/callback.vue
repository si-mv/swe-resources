<template>
    <div>
        <h2>Please wait while we log you in...</h2>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    async mounted () {
        // 6. The server redirects to the callback uri with a CODE
        const code = this.$route.query.code
        console.log(code)
        try {
            // 7. We send the code up to our app server
            const res = await axios.get(`http://localhost:5000/auth/github/callback?code=${code}`)
            console.log('Access token given to callback is', res.data.access_token)
            // 10. We save the access_token
            localStorage.setItem('github_access_token', res.data.access_token)
            this.$router.replace('/user')
        } catch (err) {
            console.log(err)
        }
    }
}
</script>