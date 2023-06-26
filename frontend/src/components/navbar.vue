<template>
    <div>
        <!-- Navbar -->
        <b-navbar class="theysa-box theysa-flex-row theysa-navbar theysa-shadow" style="align-items: center;">
            <a href="#/" type="submit">Home</a>
            <a>|</a>
            <a type="submit" v-if="!logged" v-on:click="auth=true">Auth</a>
            <div v-else >
                <a type="submit" v-on:click="signout()">Logout</a>
                <a>|</a>
                <a type="submit" v-on:click="addboard=true" >Add Board</a>
            </div>
            <a>|</a>
            <a href="https://github.com/nylone/citazio.net" type="submit">About</a>
        </b-navbar>

        <!-- Modals -->
        <authmodal :show="auth" @close:auth="auth=false" @close:successauth="$emit('close:successauth'); auth=false"/>
        <addboardmodal :show="addboard" @added="$emit('refresh')" @close:addboard="addboard=false" />

    </div>
</template>

<script>
import addboardmodal from './Modals/AddBoardModal.vue'
import authmodal from './Modals/AuthModal.vue'
import {signout} from './User/user'
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
    data() {
        let auth = ref(false)
        let addboard = ref(false)
        return {
            addboard,
            auth,
            signout,
        }
    },

}
    
</script>
