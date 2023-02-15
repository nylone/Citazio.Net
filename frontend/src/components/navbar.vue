<template>
    <div>
        <h1 class="theysa-shadow" style="margin-top: 0;">theysa.id</h1>

        <!-- Navbar -->
        <nav class="theysa-box theysa-flex-row theysa-navbar theysa-shadow" style="align-items: center;">
            <a type="submit" v-on:click="get_choice('Home')">Home</a>
            <a>|</a>
            <a type="submit" v-if="!this.$logged.value" v-on:click="$refs['auth-modal'].show()">Auth</a>
            <div v-else >
                <a type="submit" v-on:click="Logout()">Logout</a>
                <a>|</a>
                <a type="submit" v-on:click="$refs['board-modal'].show()" >Add Board</a>
            </div>
            <a>|</a>
            <a type="submit" v-on:click="get_choice('About')">About</a>
        </nav>

        <!-- Auth Modal -->
        <b-modal class="theysa-shadow" size="lg" ref="auth-modal" hide-header>
            <auth v-on:CloseModal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>

        <!-- Add Board Modal -->
        <b-modal class="theysa-shadow" size="lg" ref="board-modal" hide-header>
            <board v-on:CloseModal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>

    </div>
</template>

<script>
    import auth from './auth.vue'
    import board from './AddBoard.vue'
    import { ref } from 'vue'
    export default {
        name: 'NavBar',
        components: {
            auth,
            board
        },
        setup() {
            let modalShow = ref(false)
            function Logout() {
                fetch("http://localhost:3000/signout", {
                        method: 'POST',
                    }).then(()=> {this.$logged.value = false})
            }
            function close() {
                this.$refs['auth-modal'].hide()
                this.$refs['board-modal'].hide()
            }
            return {
                modalShow,
                Logout,
                close,
            }
        },
    }
    
</script>
