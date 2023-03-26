<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <transferboard @close:transfer="$emit('close:transfer')" :board_path="board_path" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:transfer')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import transferboard from '../Boards/TransferBoard.vue';
    export default {
        name: 'TransferBoardModal',
        props: {
            board_path: String,
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            transferboard
        },
        emits: ['close:transfer'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:transfer')
                }
            }
        }
    }
</script>