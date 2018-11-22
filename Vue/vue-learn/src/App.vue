<template>
  <div id="app">
    <father />
    <im />
  </div>
</template>

<script>
import father from './components/father.vue'
import im from './components/im.vue'
import './components/n.js'
import './components/m.js'

export default {
  name: 'app',
  components: {
    father,
    im
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
