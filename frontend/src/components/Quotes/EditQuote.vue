<template>
    <div>
        <h3 class="theysa-shadow">Update Quote</h3>
        <b-form id="form">
            <b-form-input 
                placeholder="context" 
                type="text"
                id="ctx"
                size="lg"
                required
            ></b-form-input>
            <b-form-input 
                placeholder="Message 1" 
                type="text"
                id="msg-1" 
                size="lg"
                required
            ></b-form-input>
            
        </b-form>
        <center><b-icon-clipboard-plus type="submit" v-on:click="AddField()" /> Add Message </center>
        <center>
            <input 
            class="theysa-button theysa-shadow inputButton" 
            type="submit" @click="UpdateQuote(board_path, count, quote_id)"
            value="SUBMIT" 
        />
        </center>
        
        
    </div>
</template>

<script>
import { ref } from 'vue'
import { UpdateQuote } from './Quotes'

export default {
    name: 'EditQuote',
    props: {
        board_path: {
            type: String,
            default: ''
        },
        quote_id: {
            type: Number,
            default: -1
        }
    },
    data() {
        let count = ref(1)
        return {
            count,
            UpdateQuote
        }
    },
    methods: {
        AddField() {
            this.$data.count = this.$data.count + 1
            let field = document.createElement("input")
            field.placeholder = `Message ${this.$data.count}`
            field.className="form-control form-control-lg"
            field.id = `msg-${this.$data.count}`
            field.ariaRequired='true'
            let form = document.getElementById("form")
            form.appendChild(field)
        }
    }
}
</script>