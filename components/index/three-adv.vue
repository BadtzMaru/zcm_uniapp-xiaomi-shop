<template>
	<view class="d-flex">
		<image @tap="event(resdata.big)" :src="resdata.big.src" lazy-load style="width: 373rpx;height: 530rpx;border-right: 2rpx solid #F5F5F5;"></image>
		<view class="d-flex flex-column">
			<image @tap="event(resdata.smallTop)" :src="resdata.smallTop.src" style="width: 375rpx;height: 264rpx;border-bottom: 2rpx solid #F5F5F5;"></image>
			<image @tap="event(resdata.smallBottom)" :src="resdata.smallBottom.src" style="width: 375rpx;height: 264rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			resdata: Object
		},
		methods: {
			event(obj) {
				console.log(obj)
			},
		},
	}
</script>

<style>
</style>
