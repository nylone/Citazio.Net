<template>
    <div>
        <h1 class="theysa-shadow">theysa.id</h1>
        <nav class="theysa-box theysa-flex-row theysa-navbar theysa-shadow">
            <a type="submit" v-on:click="get_choice('Home')">Home</a>
            <a>|</a>
            <a type="submit" v-if="!this.$logged.value" v-on:click="get_choice('Auth')">Auth</a>
            <a type="submit" v-else v-on:click="get_choice('Logout')">Logout </a>
            <a>|</a>
            <a type="submit" v-on:click="get_choice('About')">About</a>
        </nav>
        <b-modal class="theysa-shadow" size="lg" ref="my-modal" hide-header>
            <auth v-on:CloseModal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
    import auth from './auth.vue'
    import { ref } from 'vue'
    export default {
        name: 'NavBar',
        components: {
            auth,
        },
        setup() {
            let modalShow = ref(false)
            function get_choice(i) {
                if(i === 'Auth') {
                    this.$refs['my-modal'].show()
                }
                else if(i === 'Logout') {
                    fetch("http://localhost:3000/signout", {
                        method: 'POST',
                    }).then(()=> {this.$logged.value = false})
                }
            }
            function close() {
                this.$refs['my-modal'].hide()
            }
            return {
                modalShow,
                get_choice,
                close,
            }
        },
        compatConfig: { MODE: 3 }
    }
    
</script>
