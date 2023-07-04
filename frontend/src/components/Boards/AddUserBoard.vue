<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h3>Add User </h3>
                </b-col>
            </b-row>


            <!-- Fields -->
            <b-row>
                <b-col align="center">
                    <b-form>
                        <b-form-input 
                            placeholder="Username" 
                            type="text" 
                            id="uname" 
                            size="lg" 
                            required>
                        </b-form-input>
                        <b-form-select v-model="selected" :options="levels"></b-form-select>
                        <b-form-invalid-feedback :state="NotError">
                            There was an error while adding the user to the board. Check if the user exists, otherwise contact the admin.
                        </b-form-invalid-feedback>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col align="center">
                    <input class="theysa-button theysa-shadow inputButton" type="submit" @click="NotError = AddUserBoard(board_path, selected)" value="SUBMIT" />
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import { AddUserBoard} from './Boards';
    export default {
        name: "AddUserBoard",
        props: {
            board_path: String,
        },
        data() {
            let selected = 0
            let levels = [
                {value: 0, text: 'Read Only'},
                {value: 1, text: 'Read and Write'},
                {value: 2, text: 'Moderator'}
            ]
            let NotError = true
            return {
                selected,
                levels,
                NotError,
                AddUserBoard,
            }
        }
    }
</script>