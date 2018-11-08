import Vue from 'vue'
Vue.directive('n', {
    bind(el, binding) {
        el.textContent = Math.pow(binding.value, 2)
    },
    update(el, binding) {
        el.textContent = Math.pow(binding.value, 2)
    }
})
// Vue.directive("image", {
//     inserted: function (el, binding) {
//         //为了真实体现效果，用了延时操作
//         setTimeout(function () {
//             el.setAttribute("src", binding.value);
//         }, Math.random() * 1200)
//     }
// })