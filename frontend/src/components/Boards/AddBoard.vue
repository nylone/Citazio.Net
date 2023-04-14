<template>
    <div>
        <h3 class="theysa-shadow">Add Board</h3>
        <b-form >
            <b-input size="lg" id="bname" placeholder="Board name" required type="text" />
            <b-input size="lg" id="bpath" placeholder="path" required type="text" />
            <div align="center" style="margin: 5px">
                <b-form-checkbox
                    id="public"
                    v-model="status"
                    name="checkbox"
                    value="true"
                    unchecked-value="false"
                    size="lg">
                    Public
                </b-form-checkbox>
            </div>

        </b-form>
        
        <center>
            <input class="theysa-button theysa-shadow inputButton" type="submit" @click="AddBoard(status)" value="SUBMIT" />
        </center>
    </div>
</template>

<script>
import { GetBoards, AddBoard } from './Boards'
export default {
    name: 'AddBoard',
    data() {
        return {
            status: false,
            AddBoard,
            GetBoards,
        }
    }
}
</script>