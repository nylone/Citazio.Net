<template>
    <div>
        <b-container>
            <b-row>
                <b-col>
                    <h3 v-if="operation === 'Add'">Add User </h3>
                    <h3 v-if="operation === 'Edit'">Edit User </h3>
                </b-col>
            </b-row>

            <!-- Fields -->
            <b-row>
                <b-col align="center">
                    <b-form>
                        <b-form-select
                        :options="users"
                        v-model="user"
                        :state="NotError"
                        @change="get_access_lvl"
                        required
                        >
                        </b-form-select>
                        <b-form-select v-model="selected" :options="levels"></b-form-select>
                        <b-form-invalid-feedback :state=NotError>
                            An error occured. Check if the user exists, otherwise contact the admin.
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
import { AddUserBoard, EditUserBoard, GetBoardUsers, GetBoardExternalUsers, GetUserAccessLvl} from './Boards';
    export default {
        name: "AddEditUserBoard",
        props: {
            board_path: String,
            operation: String,
        },
        data() {
            let selected = 0
            let levels = [
                {value: 0, text: 'Read Only'},
                {value: 1, text: 'Read and Write'},
                {value: 2, text: 'Admin'}
            ]
            let user
            let users
            let NotError
            return {
                selected,
                levels,
                user,
                users,
                NotError,
                AddUserBoard,
                EditUserBoard,
                GetBoardUsers,
                GetBoardExternalUsers,
                GetUserAccessLvl,
            }
        },
        methods: {
            async get_res() {
                if(this.operation === 'Add') {
                    this.NotError = await this.AddUserBoard(this.board_path, this.selected, this.user)
                }
                else if(this.operation === 'Edit') {
                    this.NotError = await this.EditUserBoard(this.board_path, this.selected, this.user)
                }   
            },
            async get_access_lvl() {
                this.selected = await this.GetUserAccessLvl(this.board_path, this.user)
            }
        },
        async mounted() {
            if(this.operation === 'Edit') {
                this.users = await this.GetBoardUsers(this.board_path)
            }
            else if(this.operation === 'Add') {
                this.users = await this.GetBoardExternalUsers(this.board_path)
            }
        }
    }
</script>
