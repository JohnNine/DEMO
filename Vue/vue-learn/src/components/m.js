import Vue from 'vue'

Vue.directive('demo', {
    inserted (el) {
        // 聚焦元素
        el.focus()
    }
})