<template>
    <div>
        <div id="div" v-on:mouseenter="movein" v-on:mouseleave="moveout" class="div">黑色</div>
        <el-button class="button" @click="click">console</el-button>
    </div>
</template>

<script>
export default {
	layout: 'demo',
	data() {
		return {
			div: '',
			num: '',
			move1: '',
			move2: ''
		}
	},
	methods: {
		errot() {},
		click() {
			console.log(this.div)
			clearInterval(this.move1)
			clearInterval(this.move2)
		},
		movein() {
			clearInterval(this.move2)
			this.move1 = setInterval(() => {
				if (this.div.offsetLeft == '200') {
					console.log('!!!')
					clearInterval(this.move1)
				} else {
					this.div.style.left = this.div.offsetLeft + 10 + 'px'
				}
			}, 30)
		},
		moveout() {
			clearInterval(this.move1)
			// if (this.div.offsetLeft == '0') {
			// 	clearInterval(this.move2)
			// } else {
			this.move2 = setInterval(() => {
				if (this.div.offsetLeft == '0') {
					console.log(2)
					clearInterval(this.move2)
				} else {
					this.div.style.left = this.div.offsetLeft - 10 + 'px'
				}
			}, 30)
			// }
		}
	},
	mounted() {
		this.div = document.getElementById('div')
		// this.move1 = setInterval(() => {
		// 	console.log(2)
		// 	this.div.style.left = this.div.offsetLeft + 10 + 'px'
		// }, 500)
		// this.move2 = setInterval(() => {
		// 	this.div.style.left = this.div.offsetLeft - 10 + 'px'
		// }, 50)
		// this.div.onmouseover = this.movein()
	}
}
</script>

<style scoped>
.div {
	line-height: 100px;
	text-align: center;
	height: 100px;
	width: 100px;
	background: #aaa;
	position: absolute;
}
</style>

