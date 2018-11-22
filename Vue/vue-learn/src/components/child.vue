<template>
    <div>
        <slot name="a"></slot>
        {{ demo }}
        <br>
        <button type="button" name="button" @click="$emit('path', paths)" >
            发送到父组件
        </button>
        <slot name="b"></slot>
    </div>
</template>

<script>
export default {
    data() {
        return {
            paths: '子组件传值',
        }
    },
    props: [
        'demo',
    ],
    methods: {
        
    },
    mounted() {
        console.log(this.demo)
    },

}
</script>
