<template>
	<view class="p-2">
		<view v-for="(item,index) in list" :key="index" class="mb-2 p-2 bg-white rounded" hover-class="bg-light" @click="open(item)">
			<view class="text-dark font-md">uniapp第三季仿微信app正式开售</view>
			<view class="font text-light-muted">开起纯nvue原生渲染,大大提高性能</view>
			<view class="font text-light-muted">9月份</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						title: 'uniapp第三季仿微信app正式开售',
						desc: '开起纯nvue原生渲染,大大提高性能',
						create_time: '9月份',
					},
					{
						title: 'uniapp第三季仿微信app正式开售',
						desc: '开起纯nvue原生渲染,大大提高性能',
						create_time: '9月份',
					},
				]
			}
		},
		methods: {
			open(item) {
				uni.navigateTo({
					url: '../msg-detail/msg-detail?detail='+JSON.stringify(item),
				});
			}
		},
	}
</script>

<style>
	page{
		background-color: #EEEEEE;
	}
</style>
