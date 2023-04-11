<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <editquote @editquote:success="$emit('success')" :board_path="board_path" :quote_id="quote_id"/>
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:editquote')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import editquote from '../Quotes/EditQuote.vue'
    export default {
        name: 'EditQuoteModal',
        props: {
            board_path: {
                type: String,
                default: ''
            },
            quote_id: {
                type: Number,
                default: -1
            },
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            editquote
        },
        emits: ['close:editquote'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:editquote')
                }
            }
        }
    }
</script>