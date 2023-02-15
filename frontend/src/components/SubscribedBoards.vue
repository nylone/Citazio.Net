<template >
    <div v-if="boards.length > 0" class="theysa-flex-row">
        <div v-for="board in boards" :key="board.id">
            <b-card class="theysa-shadow theysa-card grows" >
                <b-card-header align="right" header-border-variant="white"  header-bg-variant="white">
                    <b-icon-gear v-on:click="$refs['board-modal'].show()" type="submit"></b-icon-gear>
                    <b-icon-trash v-on:click="RmBoard(board)" type="submit"></b-icon-trash>
                </b-card-header>
                <b-card-body>
                    <b-card-title >{{ board.title }}</b-card-title>
                </b-card-body>
                <b-card-footer align="left" style="font-size: small;">
                    <p>Users: {{ board.users }}</p>
                    <p>Owner: {{ board.owner }}</p>
                    <p>Access Level: {{ board.access_lvl }}</p>
                </b-card-footer>
                    
            </b-card>
        </div>
        
    </div>

    <div v-else>
        <p>No Boards to show</p>
    </div>
</template>

<script>
    export default {
        name: 'SubscribedBoards',
        props: {
            boards: Array
        }
        
    }
    
</script>