<template >
    <div v-if="boards.length > 0" class="theysa-flex-row">
        <div v-for="board in boards" :key="board.id" class="theysa-flex-col theysa-box theysa-shadow grows">
            <p> {{ board.title }} </p>
        </div>
    </div>

    <div v-else>
        <p>No Boards to show</p>
    </div>
</template>

<script>
    export default {
        name: 'OwnedBoards',
        props: {
            boards: Object
        }
        
    }
    
</script>