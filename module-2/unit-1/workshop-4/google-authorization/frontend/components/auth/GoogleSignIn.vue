<template>
    <button
        class="mt-5 px-4 py-1 text-sm text-red-600 font-semibold rounded-full border border-red-200 hover:text-white hover:bg-red-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
        @click="signIn()"
    >
        Login with Google
    </button>
</template>

<script>
export default {
    data () {
        return {
            client_id: '898825302120-s2u249rt83o492a5rvh79klo7hgrhpam.apps.googleusercontent.com'
        }
    },

    computed: {
        url () {
            let url = 'https://accounts.google.com/o/oauth2/v2/auth'
            url += `?client_id=${this.client_id}`
            url += `&redirect_uri=${encodeURIComponent('http://localhost:3000/auth/google/callback')}`
            url += `&response_type=code`
            url += `&access_type=offline`
            url += `&scope=${encodeURIComponent('openid profile email')}`
            return url
        }
    },

    methods: {
        signIn () {
            window.open(this.url, '_self')
        }
    }
}
</script>
