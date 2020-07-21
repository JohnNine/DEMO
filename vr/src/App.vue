<template>
  <div id="app">
    <pannellumn v-if="show" src="2.jpg"></pannellumn>
    <pannellumn v-else src="3.jpg"></pannellumn>
    <div class="op">
      <img @click="show = true" :class="!show ? 'oping oping2' : 'oping' " data-index="0" src="https://360pic.kcimg.cn/imgvr/0/10/10086.jpg_210x140.jpg" alt />
      <img @click="show = false" :class="show ? 'oping oping2' : 'oping' " data-index="1" src="https://360pic.kcimg.cn/imgvr/0/10/10087.jpg_210x140.jpg" alt />
    </div>
  </div>
</template>

<script>
import pannellumn from "vue-pannellum";
export default {
  name: "App",
  components: {
    pannellumn
  },
  data() {
    return {
      show: true
    }
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  position: relative;
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width: 100%;
  height: 100%;
}
.op {
  position: fixed;
  right: 0;
  top: 40%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.oping {
  margin-top: 10px;
  width: 70px;
  height: 50px;
}
.oping2 {
  margin-top: 10px;
  width: 50px;
  height: 40px;
}
</style>
