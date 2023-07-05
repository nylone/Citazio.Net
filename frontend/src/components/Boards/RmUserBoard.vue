<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h3 class="theysa-shadow"> Remove User </h3>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form id="form">
                        <b-form-input 
                        placeholder="Username" 
                        type="text"
                        id="user"
                        size="lg"
                        :state="NotError"
                        required
                        >
                        </b-form-input>
                        <b-form-invalid-feedback :state="NotError">
                            There was an error while removing the user from the board. Check if the user exists, otherwise contact the admin.
                        </b-form-invalid-feedback>
                    </b-form>
                </b-col>
            </b-row>
            <b-row>
                <b-col align="center">
                    <input 
                    class="theysa-button theysa-shadow inputButton" 
                    type="submit" @click="get_res"
                    value="SUBMIT" 
                    />
                </b-col>
            </b-row>
        </b-container>
        
        
        <center>

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
            let NotError = null
            return {
                NotError,
                RmUserBoard
            }
        },
        methods: {
            async get_res() {
                this.NotError = await this.RmUserBoard(this.board_path);
            }
        }
    }
</script>