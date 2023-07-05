<template>
    <div>
        <h3 class="theysa-shadow">Add Board</h3>
        <b-form >
            <b-form-input size="lg" id="bname" placeholder="Board name" required type="text" />
            <b-form-input size="lg" :state="NotError" id="bpath" placeholder="path" required type="text" />
            <b-form-invalid-feedback :state="NotError">
                Could not add board. Maybe the path already exists. If that's not the case, please contact the admin.
            </b-form-invalid-feedback>
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
            <input class="theysa-button theysa-shadow inputButton" type="submit" @click="get_res" value="SUBMIT" />
        </center>
    </div>
</template>

<script>
import { GetBoards, AddBoard } from './Boards'
export default {
    name: 'AddBoard',
    data() {
        let status = false
        let NotError

        return {
            status,
            NotError,
            AddBoard,
            GetBoards,
        }
    },
    methods: {
        async get_res() {
            this.NotError = await this.AddBoard(this.status);
        }
    }
}
</script>