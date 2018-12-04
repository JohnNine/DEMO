<template>
  <section class="container">
    <logo/>
    <h1 class="title">
      This page is loaded from the {{ name }}
    </h1>
    <h2 
      v-if="name === 'client'"
      class="info" 
    >
      Please refresh the page
    </h2>
    <nuxt-link 
      class="button" 
      to="/"
    >
      Home page
    </nuxt-link>
  </section>
</template>
<script>
import Logo from '~/components/Logo.vue'

export default {
  asyncData({ req }) {
    return {
      name: req ? 'server' : 'client'
    }
  },
  head() {
    return {
      title: `About Page (${this.name}-side)`
    }
  }
}
</script>

<style scoped>
.title {
  margin-top: 50px;
}
.info {
  font-weight: 300;
  color: #9aabb1;
  margin: 0;
  margin-top: 10px;
}
.button {
  margin-top: 50px;
}
</style>
