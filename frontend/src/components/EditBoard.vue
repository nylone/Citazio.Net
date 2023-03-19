<template>
    <div>
        <div class="theysa-flex-col">
            <h3 class="theysa-shadow">Edit Board</h3>
            <form action="javascript:void(0);" class="theysa-flex-col">
                <input
                        class="theysa-shadow grows"
                        id="bname"
                        placeholder="New title"
                        required
                        type="text"
                />
                <label class="theysa-flex-row" style="align-items: center;" for="checkbox">
                        <input id="pub" name="checkbox" type="checkbox" style="width: auto;" value="true"/>
                        <p style="margin-bottom: 0; ">Public</p>
                </label>
                
                <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="EditBoard(board_path)" value="SUBMIT"/>
            </form>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'EditBoard',
        props: {
            board_path: String
        },
        setup() {
            function EditBoard(board_path) {
                let title = document.getElementById("bname").value
                let pub = document.querySelector("#pub")
                let path = 'http://localhost:3000/board/' + board_path + '/update'
                fetch(path, {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"title": title, "pub": pub.checked})
                    })
            }
            return {
                EditBoard,
            }
        }
    }
</script>