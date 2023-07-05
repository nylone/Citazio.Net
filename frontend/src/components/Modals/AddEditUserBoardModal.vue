<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <addedituserboard @close:AddEdituser="$emit('close:AddEdituser')" :board_path="board_path" :operation="operation" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:AddEdituser')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import addedituserboard from '../Boards/AddEditUserBoard.vue';
    export default {
        name: 'AddUserBoardModal',
        props: {
            board_path: String,
            operation: String,
            show:{
                type: Boolean,
                default: false
            },
        },
        components: {
            addedituserboard
        },
        emits: ['close:AddEdituser'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:AddEdituser')
                }
            }
        }
    }
</script>