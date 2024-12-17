<template>
	<div class="container">
		<div class="plugins-tips">
			<h2>vue-schart：vue.js封装sChart.js的图表组件</h2>
			
		</div>
		<el-card class="mgb20" shadow="hover">
			<template #header>
				<div class="content-title">柱状图</div>
			</template>
			<schart class="schart" canvasId="bar" :options="options1"></schart>
		</el-card>
		<el-card class="mgb20" shadow="hover">
			<template #header>
				<div class="content-title">折线图</div>
			</template>
			<schart class="schart" canvasId="line" :options="options2"></schart>
		</el-card>
		<el-card class="mgb20" shadow="hover">
			<template #header>
				<div class="content-title">饼状图</div>
			</template>
			<schart class="schart" canvasId="pie" :options="options3"></schart>
		</el-card>
		<el-card class="mgb20" shadow="hover">
			<template #header>
				<div class="content-title">环形图</div>
			</template>
			<schart class="schart" canvasId="ring" :options="options4"></schart>
		</el-card>
	</div>
</template>

<script setup lang="ts" name="schart">
import Schart from 'vue-schart';

const options1 = {
	type: 'bar',
	title: {
		text: '最近一周各类数据的柱状图'
	},
	colorList: ["#3f51b5", "#009688", "#f44336", "#00bcd4", "#1ABC9C"],
	labels: ['周一', '周二', '周三', '周四', '周五'],
	datasets: [
		{
			label: '血糖',
			// fillColor: 'rgba(241, 49, 74, 0.5)',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: '血压',
			data: [164, 178, 190, 135, 160]
		},
		{
			label: '心率',
			data: [144, 198, 150, 235, 120]
		}
	]
};




const options2 = {
	type: 'line',
	title: {
		text: '某个月的血糖、血压、心率的平均值变化曲线'
	},
	colorList: ["#3f51b5", "#009688", "#f44336", "#00bcd4", "#1ABC9C"],
	labels: ['6月', '7月', '8月', '9月', '10月'],
	datasets: [
		{
			label: '血糖',
			data: [234, 278, 270, 190, 230]
		},
		{
			label: '血压',
			data: [164, 178, 150, 135, 160]
		},
		{
			label: '心率',
			data: [114, 138, 200, 235, 190]
		}
	]
};










const options3 = {
	type: 'pie',
	title: {
		text: '饼状图'
	},
	legend: {
		position: 'left'
	},
	colorList: ["#2196f3", '#673ab7', "#009688", "#1ABC9C", "#3f51b5", "#f44336", "#00bcd4"],
	labels: ['1', '2', '3', '4', '5', '6', '7'],
	datasets: [
		{
			data: [334, 278, 190, 235, 260, 200, 141]
		}
	]
};






const options4 = {
	type: 'ring',
	title: {
		text: '环形三等分'
	},
	showValue: false,
	legend: {
		position: 'bottom',
		bottom: 40
	},
	colorList: ["#3f51b5", "#009688", "#f44336", "#00bcd4", "#1ABC9C"],
	labels: ['vue', 'react', 'angular'],
	datasets: [
		{
			data: [500, 500, 500]
		}
	]
};
</script>

<style scoped>
.schart {
	width: 100%;
	height: 400px;
}

.content-title {
	font-weight: 400;
	font-size: 22px;
	color: #1f2f3d;
}
</style>
