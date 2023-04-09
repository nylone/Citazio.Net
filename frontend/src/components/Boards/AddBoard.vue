<template>
    <div>
        <div class="theysa-flex-col">
            <h3 class="theysa-shadow">Add Board</h3>
            <form action="javascript:void(0);" class="theysa-flex-col">
                <input class="theysa-shadow grows" id="bname" placeholder="Board name" required type="text" />
                <input class="theysa-shadow grows" id="bpath" placeholder="path" required type="text" />
                <label class="theysa-flex-row" style="align-items: center;" for="checkbox">
                    <input id="pub" name="checkbox" type="checkbox" style="width: auto;" value="true" />
                    <p style="margin-bottom: 0; ">Public</p>
                </label>

                <input class="theysa-button theysa-shadow theysa-grows" type="submit" @click="AddBoard()" value="SUBMIT" />
            </form>
        </div>
    </div>
</template>

<script>
import { GetBoards, AddBoard } from './Boards'
export default {
    name: 'AddBoard',
    data() {
        return {
            AddBoard,
            GetBoards,
        }
    }
}
</script>