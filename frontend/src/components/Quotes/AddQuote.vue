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
                    <b-form id="form">
                        <div id="phrase-1">
                            <p id="p-1"><b>Phrase 1</b> </p>
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
                        </div>
                    </b-form>
                </b-col>
            </b-row>

            <!-- Error Message when adding a phrase-->
            <b-row>
                <b-col>
                    <b-form-invalid-feedback :state="NotAddError"> You should write at least a message before adding a new quote</b-form-invalid-feedback>
                </b-col>
            </b-row>

            <!-- Error Message when removing a phrase-->
            <b-row>
                <b-col>
                    <b-form-invalid-feedback :state="NotRemoveError"> You should at least add another phrase before removing it </b-form-invalid-feedback>
                </b-col>
            </b-row>

            <!-- Add and Remove Fields options -->
            <b-row>
                <b-col >
                    <b-icon-clipboard-plus style="margin-top:5px; float:right;" v-on:click="AddFields()"></b-icon-clipboard-plus>
                </b-col>

                <b-col>
                    <b-icon-clipboard-minus style="margin-top:5px;" v-on:click="RemoveFields()"></b-icon-clipboard-minus>
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
import { AddEditQuote, AddPhrase } from './Quotes'
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
        let NotAddError
        let NotRemoveError
        return {
            count,
            NotAddError,
            NotRemoveError,
            AddEditQuote,
            AddPhrase,
        }
    },
    methods: {
        AddFields() {
            if(document.getElementById(`msg-${this.count}`).value != "") {
                this.NotAddError = null
                this.NotRemoveError = null
                document.getElementById(`msg-${this.count}`).classList.remove("is-invalid")
                this.count = this.count + 1
                AddPhrase(this.count)
            }
            else {
                this.NotAddError = false
                document.getElementById(`msg-${this.count}`).classList.add("is-invalid")
            }
        },
        RemoveFields() {
            if(this.count > 1) {
                this.NotAddError = null
                this.NotRemoveError = null
                let form = document.getElementById("form")  // Form where the fields will be removed
                let phrase = document.getElementById(`phrase-${this.count}`)
                form.removeChild(phrase)
                this.count = this.count - 1
            }
            else {
                this.NotRemoveError = false
            }
        }
    }
}

</script>