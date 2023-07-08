<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <editquote @close:AddEditQuote="$emit('success')" :board_path="board_path" :quote="quote"/>
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:AddEditQuote')" >Close</b-button>
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
            quote: {
                type: Object,
            },
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            editquote
        },
        emits: ["close:AddEditQuote"],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit("close:AddEditQuote")
                }
            }
        }
    }
</script>