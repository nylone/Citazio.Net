<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <addboard @close:addboard="$emit('close:addboard')" />
            <template #modal-footer>
                <b-button size="md" variant="secondary" @click="$emit('close:addboard')" >Close</b-button>
            </template> 
        </b-modal>
    </div>
</template>

<script>
import addboard from '../Boards/AddBoard.vue'
    export default {
        name: 'AddBoardModal',
        props: {
            show:{
                type: Boolean,
                default: false
            }
        },
        components: {
            addboard
        },
        emits: ['close:addboard'],
        computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:addboard')
                }
            }
        }
    }
</script>