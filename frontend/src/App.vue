<template>
    <div>
        <h1 class="theysa-shadow" style="margin-top: 0;">theysa.id</h1>
        <navbar :logged="logged" @close:successauth="logged = true" @logout="logged = false" />
        <component :board_title=title :board_path=path @onpath="(board_path, board_title) => setData(board_path, board_title)" v-if="logged" :is="currentView" />
    </div>
</template>

<script>
import navbar from './components/navbar.vue'
import boards from './components/Boards/Boards.vue';
import quotes from './components/Quotes/Quotes.vue';
import { ref } from 'vue'

const routes = {
    '/': boards,
    '/quotes': quotes,
}

export default {
    name: 'App',
    components: {
        navbar,
        boards,
        quotes

    },
    data() {
        let logged = ref(false)
        let path = ref('')
        let title = ref('')
        return {
            logged,
            path,
            title,
            currentPath: window.location.hash
        }
    },
    methods: {
        setData(board_path, board_title) {
            this.path=board_path
            this.title = board_title
        }
    },
    computed: {
        currentView() {
            return routes[this.currentPath.slice(1) || '/']
        }
    },

    watch: {
        currentPath() {
            this.currentView
        }
    },

    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash
        })
    }
}
</script>