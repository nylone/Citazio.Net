<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="theysa-shadow">Add Quote</h3>
                </b-col>
            </b-row>
            
            <!-- Fields -->
            <b-row>
                <b-col>
                    <p><b>Phrase 1</b> </p>
                    <b-form id="form">
                        <b-form-input 
                            placeholder="Context" 
                            type="text"
                            id="ctx-1"
                            size="lg"
                        />

                        <b-form-input 
                            placeholder="By" 
                            type="text"
                            id="by-1" 
                            size="lg"
                        />

                        <b-form-input 
                            placeholder="Message" 
                            type="text"
                            id="msg-1" 
                            size="lg"
                            required
                        />
                    </b-form>
                </b-col>
            </b-row>

            <!-- Error Message -->
            <b-row>
                <b-col>
                    <b-form-invalid-feedback :state="NotError"> You should write at least a message before adding a new quote</b-form-invalid-feedback>
                </b-col>
            </b-row>

            <!-- Add Fields option-->
            <b-row>
                <b-col align="center">
                    <b-icon-clipboard-plus style="margin:5px;" v-on:click="AddMoreFields()"></b-icon-clipboard-plus>
                </b-col>
            </b-row>

            <!-- General context field -->
            <b-row>
                <b-col>
                    <b-form-input 
                    placeholder="General Context" 
                    type="text"
                    id="general_ctx" 
                    size="lg"
                    required
                    />
                </b-col>
            </b-row>

            <!-- Submit button-->
            <b-row >
                <b-col align="center">
                    <input 
                    class="theysa-button theysa-shadow inputButton" 
                    type="submit" @click="AddEditQuote(board_path, count, 'Add', null)"
                    value="SUBMIT" 
                    />
                </b-col>
            </b-row>

        </b-container>
    </div>
</template>

<script>
import { AddEditQuote } from './Quotes'
export default {
    name: 'AddQuote',
    props: {
        board_path: {
            type: String,
            default: ''
        },
    },
    data() {
        let count = 1
        let NotError
        return {
            count,
            NotError,
            AddEditQuote
        }
    },
    methods: {
        
        AddMessage(count) {  // Adds a message field
            let field = document.createElement("input") 
            field.placeholder = "Message"
            field.className="form-control form-control-lg"
            field.id = `msg-${count}` // Its id will be msg-i+1
            field.ariaRequired='true'
            let form = document.getElementById("form")  // Form where the "msg" will be added 
            form.appendChild(field)
        },

        AddContext(count) {  // Adds a context field
            let field = document.createElement("input") 
            field.placeholder = "Context"
            field.className="form-control form-control-lg"
            field.id = `ctx-${count}` // Its id will be: ctx-i+1
            field.ariaRequired='true'
            let form = document.getElementById("form")  // Form where the "ctx" will be added 
            form.appendChild(field)
        },

        AddBy(count) {  // Adds a by field
            let field = document.createElement("input") 
            field.placeholder = "By"
            field.className="form-control form-control-lg"
            field.id = `by-${count}` // Its id will be: by-i+1
            field.ariaRequired='true'
            let form = document.getElementById("form")  // Form where the "By" will be added 
            form.appendChild(field)
        },

        AddParagraph(count) {  // Adds the 'Quote i' at the beginning of each section
            let par = document.createElement("p")
            par.style.paddingTop="5px"
            par.style.fontWeight="bold"
            par.append(document.createTextNode(`Phrase ${count}`))  // appends the text to the paragraph
            let form = document.getElementById("form")  // Form where the paragraph will be added 
            form.appendChild(par)
        },

        AddMoreFields() {
            if(document.getElementById(`msg-${this.$data.count}`).value != "") {
                this.NotError = null
                document.getElementById(`msg-${this.$data.count}`).classList.remove("is-invalid")
                this.$data.count = this.$data.count + 1
                this.AddParagraph(this.$data.count)
                this.AddContext(this.$data.count)
                this.AddBy(this.$data.count)
                this.AddMessage(this.$data.count)
            }
            else {
                this.NotError = false
                document.getElementById(`msg-${this.$data.count}`).classList.add("is-invalid")
            }
        }
    }
}

</script>