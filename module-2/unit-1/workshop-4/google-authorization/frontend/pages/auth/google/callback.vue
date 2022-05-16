<template>
    <h1>
        Please wait while we sign you in...
    </h1>
</template>

<script>
import axios from 'axios'

export default {
    async mounted () {
        const code = this.$route.query.code
        try {
            const res = await axios.post(`http://localhost:5000/auth/google?code=${code}`, {})
            console.log(res)
            const access_token = res.data.access_token
            localStorage.setItem('google_access_token', access_token)
            this.$router.replace('/user')
        } catch (err) {
            console.error(err)
        }
    }
}

</script>
