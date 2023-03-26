<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <editboard @close:edit="$emit('close:edit')" :board_path="board_path" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:edit')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import editboard from '../Boards/EditBoard.vue'
    export default {
        name: 'EditBoardModal',
        props: {
            board_path: String,
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            editboard
        },
        emits: ['close:edit'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:edit')
                }
            }
        }
    }
</script>