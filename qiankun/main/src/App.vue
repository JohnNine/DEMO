<template>
  <div id="app">
    <div id="nav">
      <router-link to="/path1">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { registerMicroApps, start } from 'qiankun'

import axios from 'axios'

export default {
  data() {
    return {}
  },
  mounted() {
    // 定义传入子应用的数据，方法和主键
    const msg = {
      data: this.$store.getters,
      fns: [],
      prototype: [{ name: '$axios', value: axios }]
    }
    // 注册子应用,可以根据登录后的权限加载对应的子项目
    registerMicroApps(
      [
        // {
        //   name: 'module-app1',
        //   entry: '//localhost:8081',
        //   container: '#root-view',
        //   activeRule: '/app1',
        //   props: msg
        // },
        {
          name: 'path1',
          // entry: '//localhost:8081',
          entry: { scripts: ['//localhost:8081/main.js'] },
          container: '#root-view',
          activeRule: '/path1',
          props: msg
        }
      ],
      {
        beforeLoad: [
          app => {
            console.log('before load', app)
          }
        ],
        beforeMount: [
          app => {
            console.log('before mount', app)
          }
        ],
        afterUnmount: [
          app => {
            console.log('after unload', app)
          }
        ]
      }
    )

    // 启动微服务
    start({ prefetch: true })
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
