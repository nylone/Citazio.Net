<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <adduserboard @close:adduser="$emit('close:adduser')" :board_path="board_path" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:adduser')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import adduserboard from '../Boards/AddUserBoard.vue';
    export default {
        name: 'AddUserBoardModal',
        props: {
            board_path: String,
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            adduserboard
        },
        emits: ['close:adduser'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:adduser')
                }
            }
        }
    }
</script>