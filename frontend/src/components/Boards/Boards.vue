<template>
    <b-container fluid>
        <div class="theysa-box">
            <b-row > 
                <b-col >
                    <center><h5 class="w-50">Your Boards</h5></center>
                </b-col> 
            </b-row>
            <b-row align-h="center" align-content="center"> 
                <ownedboards 
                @reload="refresh()" 
                @onpath="(board_path, board_title) => $emit('onpath', board_path, board_title)"
                :boards="boards.boards_owned" 
                />
            </b-row>
        </div>

        <div class="theysa-box">
            <b-row>
                <b-col>
                    <center><h5 class="w-50">Public Boards</h5></center>
                </b-col> 
            </b-row>
            <b-row>
                <publicboards 
                @reload="refresh()"
                @onpath="(board_path, board_title) => $emit('onpath', board_path, board_title)"
                :boards="boards.boards_public" 
                />
                
            </b-row>
            
        </div>
        <div class="theysa-box">
            <b-row>
                <b-col>
                <center><h5 class="w-50">Friends Boards</h5></center>
                </b-col> 
            </b-row>
            <b-row> 
                <subscribedboards 
                @reload="refresh()"
                @onpath="(board_path, board_title) => $emit('onpath', board_path, board_title)"
                :boards="boards.boards_subscribed" 
                /> 
            </b-row>
            
        </div>
    </b-container>
</template>

<script>
import subscribedboards from './SubscribedBoards.vue'
import publicboards from './PublicBoards.vue'
import ownedboards from './OwnedBoards.vue'
import { GetBoards } from './Boards'

export default {
    name: 'BoardS',
    components: {
        publicboards,
        subscribedboards,
        ownedboards,

    },
    props: {
        update: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let boards = {}
        return {
            boards,
            GetBoards
        }
    },
    // Constructor
    created: async function () {
        this.refresh()
    },
    methods: {
        async refresh() {
            this.$data.boards = await this.GetBoards();
        }
    },
    watch: {
        update() {
            if(this.$props.update) {
                this.refresh()
                this.$emit('done:update')
            }
        }
    },

}
</script>