<template>
    <div>
        <b-modal class="theysa-shadow" size="lg" v-model="value" hide-header>
            <p>Confirm the operation?</p>
            <template #modal-footer>
                <b-button size="md" variant="success" @click="$emit('close:Yes')" >Yes</b-button>
                <b-button size="md" variant="danger" @click="$emit('close:No')" >No</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "ConfirmModal",
    props: {
        show:{
            type: Boolean,
            default: false
        }
    },
    emits: ['close:No', 'close:Yes'],
    computed: {
            value: {
                get() {
                    return this.$props.show
                },
                set() {
                    this.$emit('close:No')
                }
            }
        }
}
</script>