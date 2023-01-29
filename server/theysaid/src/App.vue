<template>
  <navbar/>
  
  <auth />
</template>

<script>
import auth from './components/auth.vue'
import navbar from './components/navbar.vue'

export default {
  name: 'App',
  components: {
    navbar,
    auth,
    
  }
}
</script>