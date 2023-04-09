<template>
    <div class="theysa-flex-col">
        <h3 class="theysa-shadow">Add User To Board</h3>
        <form id="form" action="javascript:void(0);" class="theysa-flex-col">
            <input
                class="theysa-shadow grows"
                id="uname"
                placeholder="name"
                type="text"
            />
            <label class="theysa-flex-row" style="align-items: center;" for="checkbox">
                <input id="accesslvl" name="checkbox" type="checkbox" style="width: auto;" value="true"/>
                <p style="margin-bottom: 0; ">0</p>
                <input id="accesslvl" name="checkbox" type="checkbox" style="width: auto;" value="true"/>
                <p style="margin-bottom: 0; ">1</p>
                <input id="accesslvl" name="checkbox" type="checkbox" style="width: auto;" value="true"/>
                <p style="margin-bottom: 0; ">2</p>
            </label>
        </form>
        <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="AddUserBoard(board_path)" value="SUBMIT"/>
    </div>
</template>

<script>
import { AddUserBoard, GetBoards } from './Boards';
    export default {
        name: "AddUserBoard",
        props: {
            board_path: String,
        },
        data() {
            return {
                AddUserBoard,
                GetBoards
            }
        }
    }
</script>