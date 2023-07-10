<template>
    <div>
        <h1 class="theysa-shadow" style=" margin-top: 0;"> citazio.net<b-badge variant="info">Beta </b-badge> </h1>
        <navbar @refresh="update=true" :logged="logged" @close:successauth="logged = true; guest=false" @logout="logged = false; guest=true" />
        <center><cookiebanner /></center>
        <component 
            :update=update 
            :board_title=title 
            :board_path=path 
            :guest=guest
            @onpath="(board_path, board_title) => setData(board_path, board_title)"
            @rmquote:success="update=true"
            @done:update="update=false" 
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
import { check_session } from './components/User/user';

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
        let guest = ref(true)
        let path = ref('')
        let title = ref('')
        let update = ref(false)
        return {
            logged,
            guest,
            path,
            title,
            update,
            currentPath: window.location.hash,
            check_session,
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

    async mounted() {
        window.addEventListener('hashchange', () => {
            this.currentPath = window.location.hash
        });

        this.logged = await this.check_session()
        if(this.logged) {
            this.guest=false
        }
    },
    created() {
        let url = new URL(window.location).hash
        let hash = url.substring(1, 8)
        let query = new URLSearchParams(url.substring(8)).get('path')
        if(query != null) {
            this.setData(query, "test")
            this.currentPath = '#' + hash
        }
    }
}
</script>
