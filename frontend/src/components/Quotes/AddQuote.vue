<template>
    <div>
        <b-container>
            <b-row align-content="center">
                <b-col>
                    <h3 class="theysa-shadow">Add Quote</h3>
                </b-col>
            </b-row>
            
            <!-- Fields -->
            <b-row align-content="center">
                <b-col>
                    <b-form id="form">
                        <b-form-input 
                            placeholder="context" 
                            type="text"
                            id="ctx"
                            size="lg"
                            required>
                            </b-form-input>

                            <b-form-input 
                            placeholder="Message 1" 
                            type="text"
                            id="msg-1" 
                            size="lg"
                            required
                            >
                        </b-form-input>
                    </b-form>
                </b-col>
            </b-row>

            <!-- Add Field option-->
            <b-row>
                <b-col align="center">
                    <b-icon-clipboard-plus style="margin:5px;" v-on:click="AddField()"></b-icon-clipboard-plus>
                </b-col>
            </b-row>

            <!-- Submit button-->
            <b-row >
                <b-col align="center">
                    <input 
                    class="theysa-button theysa-shadow inputButton" 
                    type="submit" @click="AddQuote(board_path, count)"
                    value="SUBMIT" 
                    />
                </b-col>
            </b-row>
            
            

        </b-container>
    </div>
</template>

<script>
import { AddQuote } from './Quotes'
import { ref } from 'vue'
export default {
    name: 'AddQuote',
    props: {
        board_path: {
            type: String,
            default: ''
        },
    },
    data() {
        let count = ref(1)
        return {
            count,
            AddQuote
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