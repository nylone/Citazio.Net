<template>
    <div>
        <h3 class="theysa-shadow"> Remove User </h3>
        <b-form id="form">
            <b-form-input 
                placeholder="Username" 
                type="text"
                id="user"
                size="lg"
                required
            ></b-form-input>
        </b-form>
        <center>
            <input 
            class="theysa-button theysa-shadow theysa-grows" 
            type="submit" @click="RmUserBoard(board_path)"
            value="SUBMIT" 
        />
        </center>
    </div>
</template>

<script>
import { RmUserBoard } from './Boards';
    export default {
        name: 'RmUserBoard',
        props: {
            board_path: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                RmUserBoard
            }
        }
    }
</script>