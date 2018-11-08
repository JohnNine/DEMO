<template>
  <div id="app">
    <HelloWorld />
    <im />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import im from './components/im.vue'
import './components/n.js'
import './components/m.js'

export default {
  name: 'app',
  components: {
    HelloWorld,
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
