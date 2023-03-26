<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <addquote @close:addquote="$emit('close:addquote')" :board_path="board_path" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:addquote')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import addquote from '../Quotes/AddQuote.vue';
    export default {
        name: 'AddQuoteModal',
        props: {
            board_path: String,
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            addquote
        },
        emits: ['close:addquote'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:addquote')
                }
            }
        }
    }
</script>