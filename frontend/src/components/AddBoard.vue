<template>
    <div>
        <div class="theysa-flex-col">
            <h3 class="theysa-shadow">Add Board</h3>
            <form action="javascript:void(0);" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        id="bname"
                        placeholder="Board name"
                        required
                        type="text"
                />
                <input
                        class="theysa-shadow grows"
                        id="bpath"
                        placeholder="path"
                        required
                        type="text"
                />
                <label class="theysa-flex-row" style="align-items: center;" for="checkbox">
                        <input id="pub" type="checkbox" style="width: auto;" value="true"/>
                        <p style="margin-bottom: 0; ">Public</p>
                </label>
                
                <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="AddBoard()" value="SUBMIT"/>
            </form>
        </div>
    </div>
</template>

<script>
import { store } from './store'
    export default {
        name: 'AddBoard',
        setup() {
            function AddBoard() {
                let title = document.getElementById('bname').value
                let path = document.getElementById('bpath').value
                let pub = (document.getElementById('pub').value === true)
                
                fetch("http://localhost:3000/boards/add", {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"title": title, "path": path, "pub": pub})
                        })
                        .then(response => {
                                if(response.status === 200) { 
                                        this.$logged.value=true 
                                        this.$emit("CloseModal")
                                        
                                }
                        }) 			    
            }          
            return {
                AddBoard,
                store
            }
        }
    }
</script>