<template >
    <div v-if="boards.length > 0" class="theysa-flex-row">
        <div v-for="board in boards" :key="board.id">
            <b-card class="theysa-shadow theysa-card grows" >
                <b-card-header align="right" header-border-variant="white"  header-bg-variant="white">
                    <b-icon-person-plus-fill v-on:click="Call(board, 'AddUser')" type="submit"></b-icon-person-plus-fill>
                    <b-icon-pencil-square v-on:click="Call(board, 'AddQuote')" type="submit"></b-icon-pencil-square>
                    <b-icon-arrow-left-right v-on:click="Call(board, 'Transfer')" type="submit"></b-icon-arrow-left-right>
                    <b-icon-gear v-on:click="Call(board, 'Edit')" type="submit"></b-icon-gear>
                    <b-icon-trash v-on:click="RmBoard(board)" type="submit"></b-icon-trash>
                </b-card-header>
                <b-card-body>
                    <b-card-title >{{ board.title }}</b-card-title>
                </b-card-body>
                <b-card-footer align="left" style="font-size: small;">
                    <p>Users: {{ board.users }}</p>
                    <p>Owner: {{ board.owner }}</p>
                    <p>Last Update: {{ board.last_updated }}</p>
                </b-card-footer>
            </b-card>
        </div>

        <!-- Modals -->
        <editboardmodal :board_path="path" :show=edit @close:edit="edit=false" />
        <addquotemodal :board_path="path" :show=quote @close:addquote="quote=false" />
        <transferboardmodal :board_path="path" :show=transfer @close:transfer="transfer=false" />
        <addusermodal :board_path="path" :show=adduser @close:adduser="adduser=false" />
        
    </div>

    <div v-else>
        <p>No Boards to show</p>
    </div>

</template>

<script>
import editboardmodal from './Modals/EditBoardModal.vue'
import addquotemodal from './Modals/AddQuoteModal.vue'
import transferboardmodal from './Modals/TransferBoardModal.vue'
import addusermodal from './Modals/AddUserBoardModal.vue'
import { RmBoard, GetBoards } from './Boards/Boards'
import { ref } from 'vue'
    export default {
        name: 'PublicBoards',
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
        setup() {
            let edit = ref(false)
            let quote = ref(false)
            let transfer = ref(false)
            let adduser = ref(false)
            let path = ref(" ")
            function Call(board, option) {
                path.value = board.path
                if(option === 'Edit') {
                    edit.value=true
                }
                else if(option === 'AddQuote') {
                    quote.value=true
                }
                else if(option === 'Transfer') {
                    transfer.value=true
                }
                else if(option === 'AddUser') {
                    adduser.value=true
                }
            }
            return {
                RmBoard,
                GetBoards,
                path,
                Call,
                close,
                edit,
                quote,
                transfer,
                adduser
            }
        }
    }
</script>