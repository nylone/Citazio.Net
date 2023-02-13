<template>
  <div>
    <navbar />
    <div v-if="this.$logged.value" class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
      <h5>Owned Boards</h5>
      <ownedboards :boards="store.boards.boards_owned" />
    </div>
    <div v-if="this.$logged.value" class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
      <h5>Public Boards</h5>
      <publicboards :boards="store.boards.boards_public"/>
    </div>
    <div v-if="this.$logged.value" class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
      <h5>Subscribed Boards</h5>
      <subscribedboards :boards="store.boards.boards_subscribed"/>
    </div>
  </div>
  
</template>

<script>
import navbar from './components/navbar.vue'
import { store } from './components/store'
import subscribedboards from './components/SubscribedBoards.vue'
import publicboards from './components/PublicBoards.vue'
import ownedboards from './components/OwnedBoards.vue'

export default {
  name: 'App',
  components: {
    navbar,
    publicboards,
    subscribedboards,
    ownedboards,
    
  },
  setup() {
    return {
      store,
    }
  }
}
</script>