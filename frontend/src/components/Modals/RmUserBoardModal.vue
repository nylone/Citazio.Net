<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <rmuserboard @close:adduser="$emit('close:rmuser')" :board_path="board_path" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:rmuser')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import rmuserboard from '../Boards/RmUserBoard.vue';
    export default {
        name: 'RmUserBoardModal',
        props: {
            board_path: String,
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            rmuserboard
        },
        emits: ['close:rmuser'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:rmuser')
                }
            }
        }
    }
</script>