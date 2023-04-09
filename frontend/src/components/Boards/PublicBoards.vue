<template >
    <div v-if="boards.length > 0 && (typeof boards != undefined)" class="theysa-flex-row">
        <div v-for="board in boards" :key="board.name">
            <b-card class="theysa-shadow theysa-card">
                <b-card-header class="theysa-card-actions" align="right" header-border-variant="white"
                    header-bg-variant="white">
                    <b-dropdown id="dropdown-dropup" dropup variant="text-color" no-caret
                        toggle-class="text-decoration-none" style="z-index: 3;">
                        <template #button-content>
                            <b-icon-list />
                        </template>
                        <b-dropdown-item v-on:click="RmBoard(board); $emit('reload')"> <b-icon-trash /> Remove Board
                        </b-dropdown-item>
                        <b-dropdown-item v-on:click="Call(board, 'AddUser')"> <b-icon-person-plus-fill /> Add User
                        </b-dropdown-item>
                        <b-dropdown-item v-on:click="Call(board, 'AddQuote')"> <b-icon-pencil-square /> Add Quote
                        </b-dropdown-item>
                        <b-dropdown-item v-on:click="Call(board, 'Transfer')"> <b-icon-arrow-left-right /> Transfer Board
                        </b-dropdown-item>
                        <b-dropdown-item v-on:click="Call(board, 'Edit')"> <b-icon-gear /> Edit Board </b-dropdown-item>
                    </b-dropdown>

                </b-card-header>
                <a href="#/quotes" @click="$emit('onpath', board.path, board.title)" class="theysa-card-body"
                    style="margin:0">
                    <b-card-title class="theysa-card-body">
                        {{ board.title }}
                    </b-card-title>
                </a>
                <b-card-footer align="left" class="theysa-card-footer">
                    <p>Owner: {{ board.owner }}</p>
                    <p>Last Update: {{ board.last_updated }}</p>
                </b-card-footer>
            </b-card>

        </div>

        <!-- Modals -->
        <editboardmodal :board_path="path" :show=edit @close:edit="$emit('reload'); edit = false" />
        <addquotemodal :board_path="path" :show=quote @close:addquote="$emit('reload'); quote = false" />
        <transferboardmodal :board_path="path" :show=transfer @close:transfer="$emit('reload'); transfer = false" />
        <addusermodal :board_path="path" :show=adduser @close:adduser="$emit('reload'); adduser = false" />

    </div>

    <div v-else>
        <p>No Boards to show</p>
    </div>
</template>

<script>
import editboardmodal from '../Modals/EditBoardModal.vue'
import addquotemodal from '../Modals/AddQuoteModal.vue'
import transferboardmodal from '../Modals/TransferBoardModal.vue'
import addusermodal from '../Modals/AddUserBoardModal.vue'
import { RmBoard, GetBoards } from './Boards'
import { ref } from 'vue'
export default {
    name: 'OwnedBoards',
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
        addusermodal
    },

    data() {
        let edit = ref(false)
        let quote = ref(false)
        let transfer = ref(false)
        let adduser = ref(false)
        let path = ref(" ")
        return {
            edit,
            quote,
            transfer,
            adduser,
            path,
            RmBoard,
            GetBoards,
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
        },
    }
}
</script>