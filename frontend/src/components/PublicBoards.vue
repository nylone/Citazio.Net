<template >
    <div v-if="boards.length > 0" class="theysa-flex-row">
        <div v-for="board in boards" :key="board.id">
            <b-card class="theysa-shadow theysa-card grows" >
                <b-card-header align="right" header-border-variant="white"  header-bg-variant="white">
                    <b-icon-person-plus-fill v-on:click="CallAddUser(board)" type="submit"></b-icon-person-plus-fill>
                    <b-icon-pencil-square v-on:click="CallAddQuote(board)" type="submit"></b-icon-pencil-square>
                    <b-icon-arrow-left-right v-on:click="CallTransferBoard(board)" type="submit"></b-icon-arrow-left-right>
                    <b-icon-gear v-on:click="CallEdit(board)" type="submit"></b-icon-gear>
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

        <!-- Edit Board Modal -->
        <b-modal class="theysa-shadow" size="lg" ref="board-modal" hide-header>
            <editboard :board_path="path" v-on:close-modal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>

        <!-- Add Quote Modal -->
        <b-modal class="theysa-shadow" size="lg" ref="quote-modal" hide-header>
            <addquote :board_path="path" v-on:close-modal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>

        <!-- Transfer Board Modal -->
        <b-modal class="theysa-shadow" size="lg" ref="transfer-modal" hide-header>
            <transferboard :board_path="path" v-on:close-modal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>

         <!-- AddUser Modal -->
         <b-modal class="theysa-shadow" size="lg" ref="adduser-modal" hide-header>
            <adduserboard :board_path="path" v-on:close-modal="close()"/>
            <template #modal-footer="{close}">
                <b-button size="md" variant="secondary" @click="close()">Close</b-button>
            </template> 
        </b-modal>

        
    </div>

    <div v-else>
        <p>No Boards to show</p>
    </div>

</template>

<script>
import editboard from './EditBoard.vue'
import { RmBoard, GetBoards } from './Boards'
import { ref } from 'vue'
    export default {
        name: 'PublicBoards',
        props: {
            boards: Array
        },
        components: {
            editboard
        },
        setup () {
            let path = ref(" ")
            function CallEdit(b) {
                path.value = b.path
                this.$refs['board-modal'].show()
            }
            return {
                CallEdit,
                RmBoard,
                GetBoards,
                path
            }
        }

        
    }
    
</script>