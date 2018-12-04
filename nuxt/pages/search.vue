<template>
  <div>
    <H1>test</H1>
    <nuxt-link to="/">
      back
    </nuxt-link>
    客户端渲染
     <div v-for="(item, index) in list" :key="index">
      {{item}}
    </div>
    服务端渲染
    <div v-for="(item, index) in list2" :key="index">
      {{item}}
    </div>
    Vuex.city.list
    <div v-for="(item, index) in $store.state.city.list" :key="index">
      {{item}}
    </div>
    Vuex.navbar.app
    <div v-for="(item, index) in $store.state.navbar.app" :key="index">
      {{item}}
    </div>
  </div>

</template>

<script>
import axios from 'axios'

export default {
  layout: 'search',
  data(){
    return{
      list: [],
      list2: [],
    }
  },
  async asyncData() {
    let {status, data:{list2}} = await axios.get('http://localhost:3000/city/list2')
    return{
      list2
    }
    console.log(status)
  },
  async mounted() {
    // console.log(this.$store.state.navbar)
    let self = this;

    let {status, data:{list}} = await axios.get('/city/list')
    self.list = list
    console.log(status)
  },
  
}
</script>

<style scoped>
</style>
