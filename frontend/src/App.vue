<template>
    <div>
        <h1 class="theysa-shadow" style=" margin-top: 0;"> citazio.net<b-badge variant="info">Beta </b-badge> </h1>
        <navbar @refresh="update=true" :logged="logged" @close:successauth="logged = true" @logout="logged = false" />
        <center><cookiebanner /></center>
        <component 
            :update=update 
            :board_title=title 
            :board_path=path 
            @onpath="(board_path, board_title) => setData(board_path, board_title)"
            @rmquote:success="update=true"
            @done:update="update=false" 
            v-if="logged" 
            :is="currentView" 
        />
        
    </div>
</template>

<script>
import navbar from './components/navbar.vue'
import notfound from './components/NotFound.vue'
import boards from './components/Boards/Boards.vue';
import quotes from './components/Quotes/Quotes.vue';
import cookiebanner from './components/User/cookiebanner.vue'
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
        quotes,
        notfound,
        cookiebanner

    },
    data() {
        let logged = ref(false)
        let path = ref('')
        let title = ref('')
        let update = ref(false)
        return {
            logged,
            path,
            title,
            update,
            currentPath: window.location.hash
        }
    },
    methods: {
        setData(board_path, board_title) {
            this.path= board_path
            this.title = board_title
        }
    },
    computed: {
        currentView() {
            let route = routes[this.currentPath.slice(1) || '/'] || notfound
            return route
        }
    },

    mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash
        })
    }
}
</script>