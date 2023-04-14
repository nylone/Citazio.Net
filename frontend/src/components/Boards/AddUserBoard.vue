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
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col align="center">
                    <input class="theysa-button theysa-shadow inputButton" type="submit" @click="AddUserBoard(board_path, selected)" value="SUBMIT" />
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
            let selected = null
            let levels = [
                {value: null, text: ' Select a Role'},
                {value: 0, text: 'Read Only'},
                {value: 1, text: 'Read and Write'},
                {value: 2, text: 'Moderator'}
            ]
            return {
                selected,
                levels,
                AddUserBoard,
            }
        }
    }
</script>