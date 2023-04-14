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
                            required>
                        </b-form-input>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col align="center">
                    <input class="theysa-button theysa-shadow inputButton" type="submit" @click="AddBoard(status)" value="SUBMIT" />
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
        return {
            TransferBoard,
            GetBoards
        }
    }

}
</script>