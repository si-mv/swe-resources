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
            localStorage.setItem('google_access_token', res.data.access_token)
            localStorage.setItem('google_id_token', res.data.id_token)
            this.$router.replace('/user')
        } catch (err) {
            console.error(err)
        }
    }
}

</script>
