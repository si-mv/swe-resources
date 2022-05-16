<template>
    <div class="m-5">
        <h1 class="text-2xl font-medium">
            Files
        </h1>
        <button
            class="my-5 px-4 py-1 text-sm text-blue-600 font-semibold rounded-full border border-blue-200 hover:text-white hover:bg-blue-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            @click="getFiles()"
        >
            Get files
        </button>
        <pre>
{{fileTitles}}
        </pre>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            files: []
        }
    },

    computed: {
        access_token () {
            return localStorage.getItem('google_access_token')
        },

        fileTitles () {
            return this.files.map(f => f.title)
        }
    },

    methods: {
        async getFiles () {
            try {
                const response = await axios.get(`https://www.googleapis.com/drive/v2/files`, {
                    headers: {
                        'Authorization': `Bearer ${this.access_token}`
                    }
                })
                this.files = response.data.items
            } catch (err) {
                console.error(err.response.data)
            }
        }
    }
}

</script>