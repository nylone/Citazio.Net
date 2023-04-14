<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <auth @close:successauth="$emit('close:successauth')" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:auth')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import auth from '../User/auth.vue'
    export default {
        name: 'AuthModal',
        props: {
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            auth
        },
        emits: ['close:auth'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:auth')
                }
            }
        }
    }
</script>