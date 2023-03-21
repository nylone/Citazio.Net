<template>
    <div>
        <div class="theysa-flex-col">
            <h3 class="theysa-shadow">Add Quote</h3>
            <form id="form" action="javascript:void(0);" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        id="ctx"
                        placeholder="context"
                        type="text"
                />
                <input
                        class="theysa-shadow grows"
                        id="msg"
                        placeholder="msg"
                        type="text"
                />
            </form>
            <b-icon-clipboard-plus style="margin:5px;" v-on:click="AddField()" ></b-icon-clipboard-plus>
            <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="AddQuote(board_path, count)" value="SUBMIT"/>
            
        </div>
    </div>
</template>

<script>
import {AddQuote} from './Quotes'
import {ref} from 'vue'
    export default {
        name: 'AddQuote',
        props: {
            board_path: String
        },
        setup() {
            let count = ref(1)
            function AddField() {
                let field = document.createElement("input")
                field.className="theysa-shadow grows"
                field.placeholder=`msg${count.value}`
                field.id=`msg${count.value}`
                let form = document.getElementById("form")
                form.appendChild(field)
                count.value = count.value + 1
            }
            return {
                AddQuote,
                AddField,
                count
            }
        }
        
    }

</script>