<template>
  <div class="container">请输入
    <div class="text">
      <textarea v-model="text" type="text"></textarea>
      <div class="contain">{{text}}</div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  data() {
    return {
      text: '',
      text2: ''
    }
  },
  components: {
    Logo
  }
}
</script>
<style lang="scss" scoped>
</style>

