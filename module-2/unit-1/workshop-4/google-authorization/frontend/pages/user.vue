<template>
    <div class="m-5">
        <h1 class="text-2xl font-medium">
            ID Token Payload
        </h1>
        <pre>
{{payload}}
        </pre>
        <h1 class="text-2xl font-medium">
            UserInfo Response
        </h1>
        <pre>
{{userInfo}}
        </pre>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            userInfo: {}
        }
    },

    computed: {
        access_token () {
            return localStorage.getItem('google_access_token')
        },
        id_token () {
            return localStorage.getItem('google_id_token')
        },
        payload () {
            const encodedPayload = this.id_token.split('.')[1]
            const json = Buffer.from(encodedPayload, 'base64').toString('utf-8')
            return JSON.parse(json)
        }
    },

    methods: {
    },

    async mounted () {
        const wellknownResponse = await axios.get('https://accounts.google.com/.well-known/openid-configuration')
        const openIdConfig = wellknownResponse.data
        const userInfoURL = openIdConfig.userinfo_endpoint
        const userInfoRes = await axios.get(userInfoURL, {
            headers: {
                'Authorization': `Bearer ${this.access_token}`
            }
        })
        this.userInfo = userInfoRes.data
    }
}

</script>