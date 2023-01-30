<template>
    <div>
        <h1 class="theysa-shadow">theysa.id</h1>
        <nav class="theysa-box theysa-flex-row theysa-navbar theysa-shadow">
            <a v-bind:id=i-1 v-for="i in 3" :key="i.id" @click="get_choice(i-1)">
                {{ options[i-1] }}
            </a>
        </nav>
        <b-modal ref="my-modal"><auth/></b-modal>
    </div>
</template>

<script>
    import { ref } from 'vue'
    import auth from './auth.vue'

    export default {
        name: 'NavBar',
        components: {
            auth,
        },
        setup() {
            let options = ["Home", "Auth", "About"]
            const choice = ref('Home')
            let modalShow = ref(false)
            function get_choice(i) {
                choice.value = options[i]
                if(choice.value == 'Auth') {
                    this.$refs['my-modal'].show()
                }
            }
            return {
                options,
                get_choice,
                choice,
                modalShow
            }
        },
        compatConfig: { MODE: 3 }
    }
    
</script>
