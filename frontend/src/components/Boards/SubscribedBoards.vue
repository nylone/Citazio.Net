<template >
    <div v-if="boards.length > 0 && (typeof boards != undefined)">
        <b-container fluid>
            <b-row cols="1" cols-md="3" align-h="center" align-content="center">
                <b-col style="max-width: 350px; margin-top: 10px;" col v-for="board in boards" :key="board.name">
                    <b-card class="theysa-shadow theysa-border" >
                        <b-card-header class="theysa-card-actions" align="right">
                            <b-dropdown id="dropdown-dropup" dropup variant="text-color" no-caret
                                toggle-class="text-decoration-none">
                                <template #button-content>
                                    <b-icon-list />
                                </template>
                                <b-dropdown-item disabled>
                                    <b-icon-trash /> Remove Board
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'AddUser')">
                                    <b-icon-person-plus-fill /> Add User
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'EditUser')">
                                    <b-icon-file-earmark-person /> Edit User 
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'RmUser')">
                                    <b-icon-person-dash-fill /> Remove User
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 1" v-on:click="Call(board, 'AddQuote')">
                                    <b-icon-pencil-square /> Add Quote
                                </b-dropdown-item>
                                <b-dropdown-item disabled>
                                    <b-icon-arrow-left-right /> Transfer Board
                                </b-dropdown-item>
                                <b-dropdown-item disabled>
                                    <b-icon-gear /> Edit Board </b-dropdown-item>
                            </b-dropdown>

                        </b-card-header>
                        <a href="#/quotes" @click="$emit('onpath', board.path, board.title)"
                            style="margin:5px">
                            <b-card-title>
                                {{ board.title }}
                            </b-card-title>
                        </a>
                        <b-card-footer align="left" class="theysa-card-footer">
                            <b-row>
                                <b-col>
                                    <p> <b>Users </b>: {{ board.users }}</p>
                                </b-col>

                                <b-col>
                                    <p> <b>Owner </b>: {{ board.owner }}</p>
                                </b-col>
                            </b-row>

                            <b-row>
                                <b-col>
                                    <p><b> Last Update: </b></p>
                                    <p v-if="board.last_updated != ''"> {{ convert_time(board.last_updated) }}</p>
                                    <p v-else> None</p>
                                </b-col>
                                <b-col>
                                    <p> <b>Permissions </b>: {{ levels[board.access_lvl] }}</p>
                                </b-col>
                            </b-row>
                            
                        </b-card-footer>
                    </b-card>

                </b-col>
            </b-row>

        </b-container>


        <!-- Modals -->
        <addquotemodal :board_path="path" :show=quote @close:AddEditQuote="$emit('reload'); quote = false" />
        <addeditusermodal :board_path="path" :show=addedituser :operation="operation" @close:AddEdituser="$emit('reload'); addedituser = false" />
        <rmuserboardmodal :board_path="path" :show="rmuser" :operation="operation" @close:rmuser="$emit('reload'); rmuser = false" />

    </div>

    <div v-else>
        <center><p>No Boards to show</p> </center>
    </div>
</template>

<script>
import addquotemodal from '../Modals/AddQuoteModal.vue'
import addeditusermodal from '../Modals/AddEditUserBoardModal.vue'
import rmuserboardmodal from '../Modals/RmUserBoardModal.vue'
import { RmBoard } from './Boards'
import { ref } from 'vue'
import { convert_time } from '../User/user'
export default {
    name: 'SubscribedBoards',
    props: {
        boards: {
            type: Array,
            required: true,
            default() {
                return []
            }
        }
    },
    components: {
        addquotemodal,
        addeditusermodal,
        rmuserboardmodal
    },

    data() {
        let quote = ref(false)
        let addedituser = ref(false)
        let rmuser = ref(false)
        let path = ref(" ")
        let operation
        const levels = Object.freeze({
            0: "Read-Only",
            1: "Read/Write",
            2: "Admin"
        })
        return {
            quote,
            addedituser,
            rmuser,
            path,
            operation,
            levels,
            RmBoard,
            convert_time
        }
    },

    methods: {
        Call(board, option) {
            this.path = board.path
            if (option === 'AddQuote') {
                this.quote = true
            }
            else if (option === 'AddUser') {
                this.addedituser = true
                this.operation = 'Add'
            }
            else if (option === 'RmUser') {
                this.rmuser = true
            }
            else if (option === 'EditUser') {
                this.addedituser = true
                this.operation = 'Edit'
            }
        },
        test() {
            return "disabled"
        }
    }
}
</script>
