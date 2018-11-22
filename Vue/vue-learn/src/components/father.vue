<template>
    <div  class="hello">
        <h5 v-for="jsons in json" :key="jsons.id">
            {{ jsons.name }}
        </h5>
        <div v-n='demo'></div>
        <div v-demo="demo"></div>
        <button @click="click">change-3</button>
        <button @click="click2">change-4</button>
        <br>
        <input class="input" v-model="a" type="number">
        +
        <input class="input" v-model="b" type="number">
        <span>={{c}}</span>
        
        <!-- 子组件 -->
        <child :demo='demo' @path='msg' >
            <h3 slot="a">插槽头</h3>
            <h3 slot="b">插槽屁股</h3>
        </child>

        {{ path }}
        
    </div>
</template>

<script>
    import child from './child.vue'

    export default {
        name: 'father',
        data() {
            return {
                json: '',
                demo: '2',
                a: '',
                b: '',
                path: '未传值',
            }
        },
        // props: {
        //     demo,
        // },
        components: {
            child,
        },
        mounted() {
            this.test()
                .then(res => console.log(1,res))
                .catch(res => console.log(2,res))
        },
        computed: {
            c(){
                // console.log(parseFloat(this.a), parseFloat(this.b))
                let a = parseFloat(this.a) 
                let b = parseFloat(this.b)
                console.log((a) , (b))
                return (a + b) || ''
            }
        },
        methods: {
            msg(path){
                this.demo ++;
                console.log(path)
                this.path = path
            },
            click(){
                console.log(this.demo)
                this.demo = 3;
                console.log(this.demo)
            },
            click2(){
                console.log(this.demo)
                this.demo = 4;
                console.log(this.demo)
            },
            test() {
                return new Promise((resolve, reject) => {
                    let result = this.random()
                    // 下面商家给出承诺，不管烧没烧好，都会告诉你
                    if (result == '菜烧好了') 
                        // 商家给出了反馈
                        resolve('我们的外卖正在给您派送了')
                    else 
                        reject('不好意思，我们菜烧糊了，您再等一会')
                })
            },   
            random() {
                return Math.random() > 0.5 ? '菜烧好了' : '菜烧糊了'
            },
        },
        created() {
            fetch('http://api.myjson.com/bins/74l63')
                .then( res => {
                    // console.log(response.json())
                    return res.json();
                })
                .then( res => {
                    console.log(res)
                    this.json = res.products
                    // console.log(this.json)
                })
        },
    }
</script>

<style scoped>
    .input{
        width: 50px;
        color: #000;
    }
</style>
