<template>
    <div >
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="theysa-shadow">Transfer Board</h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form>
                        <b-form-input 
                            placeholder="Username" 
                            type="text" 
                            id="uname" 
                            size="lg"
                            :state="NotError" 
                            required>
                        </b-form-input>
                        <b-form-invalid-feedback :state="NotError">
                            There was an error while transfering the board. Check if the user exists, otherwise contact the admin.
                        </b-form-invalid-feedback>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col align="center">
                    <input class="theysa-button theysa-shadow inputButton" type="submit" @click="get_res" value="SUBMIT" />
                </b-col>
            </b-row>
        </b-container>

    </div>
</template>

<script>
import { TransferBoard, GetBoards } from './Boards';
export default {
    name: 'TransferBoard',
    props: {
        board_path: String
    },
    data() {
        let NotError
        return {
            NotError,
            TransferBoard,
            GetBoards
        }
    },
    methods: {
        async get_res() {
            this.NotError = await this.TransferBoard(this.board_path);
        }
    }
    

}
</script>