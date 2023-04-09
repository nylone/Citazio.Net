<template>
    <div id="bodytest">
        <div class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
            <h5>Owned Boards</h5>
            <ownedboards @reload="refresh()" @onpath="(board_path, board_title) => $emit('onpath', board_path, board_title)"
                :boards="boards.boards_owned" />
        </div>
        <div class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
            <h5>Public Boards</h5>
            <publicboards @reload="refresh()"
                @onpath="(board_path, board_title) => $emit('onpath', board_path, board_title)"
                :boards="boards.boards_public" />
        </div>
        <div class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
            <h5>Subscribed Boards</h5>
            <subscribedboards @reload="refresh()"
                @onpath="(board_path, board_title) => $emit('onpath', board_path, board_title)"
                :boards="boards.boards_subscribed" />
        </div>
    </div>
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
    data() {
        let boards = {}
        return {
            boards,
            GetBoards
        }
    },
    created: async function () {
        this.$data.boards = await GetBoards();
    },
    methods: {
        async refresh() {
            this.$data.boards = await GetBoards();
        }
    }


}
</script>