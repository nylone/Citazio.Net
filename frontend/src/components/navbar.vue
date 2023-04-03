<template>
    <div>
        <!-- Navbar -->
        <nav class="theysa-box theysa-flex-row theysa-navbar theysa-shadow" style="align-items: center;">
            <a type="submit">Home</a>
            <a>|</a>
            <a type="submit" v-if="!logged" v-on:click="auth=true">Auth</a>
            <div v-else >
                <a type="submit" v-on:click="Logout()">Logout</a>
                <a>|</a>
                <a type="submit" v-on:click="addboard=true" >Add Board</a>
            </div>
            <a>|</a>
            <a type="submit">About</a>
        </nav>

        <!-- Modals -->
        <authmodal :show="auth" @close:auth="auth=false" @close:successauth="$emit('close:successauth'); auth=false"/>
        <addboardmodal :show="addboard" @close:addboard="addboard=false" />

    </div>
</template>

<script>
import addboardmodal from './Modals/AddBoardModal.vue'
import authmodal from './Modals/AuthModal.vue'
import { ref } from 'vue'
export default {
    name: 'NavBar',
    components: {
        authmodal,
        addboardmodal
    },
    props: {
        logged: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        let auth = ref(false)
        let addboard = ref(false)
        function Logout() {
            fetch("http://localhost:3000/signout", {
                method: 'POST',
            })
            .then(()=> {this.$emit('logout')})
        }
        return {
            addboard,
            auth,
            Logout,
            close,
        }
    },

}
    
</script>
