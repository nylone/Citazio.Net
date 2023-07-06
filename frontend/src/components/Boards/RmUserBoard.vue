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
                        <b-form-select 
                        style="width: 100%; margin: 5px"
                        :options="users"
                        v-model="user"
                        :state="NotError"
                        required
                        >
                        </b-form-select>
                        <b-form-invalid-feedback :state="NotError">
                            There was an error while removing the user from the board. Check if the user exists or if he's not the owner, otherwise contact the admin.
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
import { RmUserBoard, GetBoardUsers } from './Boards';
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
            let user
            let users
            return {
                NotError,
                user,
                users,
                RmUserBoard,
                GetBoardUsers
            }
        },
        methods: {
            async get_res() {
                this.NotError = await this.RmUserBoard(this.board_path, this.user);
            }
        },
        async mounted() {
            this.users = await this.GetBoardUsers(this.board_path)
        }
    }
</script>