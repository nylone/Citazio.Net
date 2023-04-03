<template>
    <div>
      <div class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
        <h5>Owned Boards</h5>
        <ownedboards @onpath="(board_path) => $emit('onpath', board_path)" :boards="store.boards.boards_owned" />
      </div>
      <div class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
        <h5>Public Boards</h5>
        <publicboards :boards="store.boards.boards_public"/>
      </div>
      <div class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
        <h5>Subscribed Boards</h5>
        <subscribedboards :boards="store.boards.boards_subscribed"/>
      </div>
    </div>
  </template>

<script>
import { store } from '../store'
import subscribedboards from './SubscribedBoards.vue'
import publicboards from './PublicBoards.vue'
import ownedboards from './OwnedBoards.vue'

export default {
  name: 'BoardS',
  components: {
    publicboards,
    subscribedboards,
    ownedboards,
    
  },
  setup() {
    return {
      store,
    }
  },


}
</script>