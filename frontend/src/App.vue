<template>
  <div>
    <navbar />
    <div v-if="this.$logged.value" class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
      <h5>Owned Boards</h5>
      <div class="theysa-flex-row">
        <ownedboards/>
      </div>
       
    </div>
    <div v-if="this.$logged.value" class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
      <h5>Public Boards</h5>
      <div class="theysa-flex-row">
        <publicboards/>
      </div>
    </div>
    <div v-if="this.$logged.value" class="theysa-box theysa-flex-col theysa-navbar theysa-shadow" style="padding-top:0">
      <h5>Subscribed Boards</h5>
      <div class="theysa-flex-row">
        <privateboards />
      </div>
    </div>
    
  </div>
  
</template>

<script>
import navbar from './components/navbar.vue'
import privateboards from './components/PrivateBoards.vue'
import publicboards from './components/PublicBoards.vue'
import ownedboards from './components/OwnedBoards.vue'

export default {
  
  name: 'App',
  components: {
    navbar,
    publicboards,
    privateboards,
    ownedboards
    
  },
}
</script>