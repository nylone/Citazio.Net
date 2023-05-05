<template >
    <div v-if="boards.length > 0 && (typeof boards != undefined)">
        <b-container fluid>
            <b-row  align-h="center" align-content="center">
                <b-col style="max-width: 350px" col v-for="board in boards" :key="board.name">
                    <b-card class="theysa-shadow theysa-border" >
                        <b-card-header class="theysa-card-actions" align="right" header-border-variant="white"
                            header-bg-variant="white">
                            <b-dropdown id="dropdown-dropup" dropup variant="text-color" no-caret
                                toggle-class="text-decoration-none">
                                <template #button-content>
                                    <b-icon-list />
                                </template>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="RmBoard(board); $emit('reload')">
                                    <b-icon-trash /> Remove Board
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'AddUser')">
                                    <b-icon-person-plus-fill /> Add User
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'RmUser')">
                                    <b-icon-person-dash-fill /> Remove User
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 1" v-on:click="Call(board, 'AddQuote')">
                                    <b-icon-pencil-square /> Add Quote
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'Transfer')">
                                    <b-icon-arrow-left-right /> Transfer Board
                                </b-dropdown-item>
                                <b-dropdown-item :disabled="board.access_lvl < 2" v-on:click="Call(board, 'Edit')">
                                    <b-icon-gear /> Edit Board </b-dropdown-item>
                            </b-dropdown>

                        </b-card-header>
                        <a href="#/quotes" @click="$emit('onpath', board.path, board.title)"
                            style="margin:0">
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
                                    <b> Last Update: </b>
                                    <p v-if="board.last_updated != ''"> {{ board.last_updated }}</p>
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
        <editboardmodal :board_path="path" :show=edit @close:edit="$emit('reload'); edit = false" />
        <addquotemodal :board_path="path" :show=quote @close:addquote="$emit('reload'); quote = false" />
        <transferboardmodal :board_path="path" :show=transfer @close:transfer="$emit('reload'); transfer = false" />
        <addusermodal :board_path="path" :show=adduser @close:adduser="$emit('reload'); adduser = false" />
        <rmuserboardmodal :board_path="path" :show="rmuser" @close:rmuser="$emit('reload'); rmuser = false" />

    </div>

    <div v-else>
        <center><p>No Boards to show</p> </center>
    </div>
</template>

<script>
import editboardmodal from '../Modals/EditBoardModal.vue'
import addquotemodal from '../Modals/AddQuoteModal.vue'
import transferboardmodal from '../Modals/TransferBoardModal.vue'
import addusermodal from '../Modals/AddUserBoardModal.vue'
import rmuserboardmodal from '../Modals/RmUserBoardModal.vue'
import { RmBoard } from './Boards'
import { ref } from 'vue'
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
        editboardmodal,
        transferboardmodal,
        addusermodal,
        rmuserboardmodal
    },

    data() {
        let edit = ref(false)
        let quote = ref(false)
        let transfer = ref(false)
        let adduser = ref(false)
        let rmuser = ref(false)
        let path = ref(" ")
        const levels = Object.freeze({
            0: "Read-Only",
            1: "Read/Write",
            2: "Admin"
        })
        return {
            edit,
            quote,
            transfer,
            adduser,
            rmuser,
            path,
            levels,
            RmBoard,
        }
    },

    methods: {
        Call(board, option) {
            this.path = board.path
            if (option === 'Edit') {
                this.edit = true
            }
            else if (option === 'AddQuote') {
                this.quote = true
            }
            else if (option === 'Transfer') {
                this.transfer = true
            }
            else if (option === 'AddUser') {
                this.adduser = true
            }
            else if (option === 'RmUser') {
                this.rmuser = true
            }
        },
        test() {
            return "disabled"
        }
    }
}
</script>