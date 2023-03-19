<template >
    <div v-if="boards.length > 0" class="theysa-flex-row">
        <div v-for="board in boards" :key="board.id">
            <b-card class="theysa-shadow theysa-card grows" >
                <b-card-header align="right" header-border-variant="white"  header-bg-variant="white">
                    <b-icon-gear v-on:click="CallEdit(board)" type="submit"></b-icon-gear>
                    <b-icon-trash v-on:click="RmBoard(board)" type="submit"></b-icon-trash>
                </b-card-header>
                <b-card-body>
                    <b-card-title >{{ board.title }}</b-card-title>
                </b-card-body>
                <b-card-footer align="left" style="font-size: small;">
                    <p>Users: {{ board.users }}</p>
                    <p>Last Update: {{ board.last_updated }}</p>
                </b-card-footer>
                    
            </b-card>
        </div>

        <!-- Edit Board Modal -->
        <b-modal class="theysa-shadow" size="lg" ref="board-modal" hide-header>
            <editboard :board_path="path" v-on:CloseModal="close()"/>
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
        name: 'OwnedBoards',
        props: {
            boards: Array
        },
        components: {
            editboard
        },
        setup() {
            let path = ref(" ")
            function CallEdit(b) {
                path.value = b.path
                this.$refs['board-modal'].show()
            }
            return {
                CallEdit,
                RmBoard,
                GetBoards,
                path,
            }
        }
        
    }
    
</script>