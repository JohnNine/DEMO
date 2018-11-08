<template>
    <div class="demo">
        <div v-for="item in imageList" :key="item.url">
            <img class="img" src="../assets/logo.png" alt="默认图" v-image="item.url">
        </div>
    </div>
</template>



<script>

    export default {
        data() {
            return {
                imageList: [
                    {
                        url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/homepage/section4/home-s4-p10-plus.jpg"
                    },
                    {
                        url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/greate-china/cn/mkt/homepage/section4/home-s4-watch2-pro-banner.jpg"
                    },
                    {
                        url: "http://consumer-img.huawei.com/content/dam/huawei-cbg-site/en/mkt/homepage/section4/home-s4-matebook-x.jpg"
                    }
                ]
            }
        },
        directives: {
            image: {
                inserted (el, binding) {
                    // var time
                    setTimeout(function(){
                        el.setAttribute("src", binding.value);
                        // time = parseInt(Math.random()*100)
                        // console.log(time)
                    }, Math.random()*10000)
                }
            }
        }
    }
</script>

<style scoped>
    .img{
        width: 200px;
        height: 200px;
    }
</style>

