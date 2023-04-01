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
                        <input id="pub" name="checkbox" type="checkbox" style="width: auto;" value="true"/>
                        <p style="margin-bottom: 0; ">Public</p>
                </label>
                
                <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="AddBoard()" value="SUBMIT"/>
            </form>
        </div>
    </div>
</template>

<script>
import { store } from '../store'
import { GetBoards } from './Boards'
    export default {
        name: 'AddBoard',
        setup() {
            function AddBoard() {
                let title = document.getElementById('bname').value
                let path = document.getElementById('bpath').value
                let pub = document.querySelector("#pub").checked
                let res
                
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
                                res = response.status
                                if(res === 200) { 
                                        this.$emit("close:addboard")
                                        GetBoards().then((res) => {store.boards=res; } )
                                }
                        })
                        
            }          
            return {
                AddBoard,
                GetBoards,
                store,
            }
        }
    }
</script>