<template>
	<view class="bg-white" @click.stop="openDetail">
		<divider></divider>
		<!-- 头部 -->
		<view class="d-flex a-center border-bottom p-2 border-light-secondary">
			<text class="text-light-muted font-md">{{item.create_time}}</text>
			<text class="main-text-color ml-auto font-md">{{item.status}}</text>
		</view>
		<!-- 身体 -->
		<view class="px-2">
			<view class="border-bottom d-flex a-center py-2 border-light-secondary" v-for="(order,orderIndex) in item.order_items" :key="orderIndex">
				<image :src="order.cover" mode="widthFix" style="width: 150rpx;height: 150rpx;" class="rounded mx-2 flex-shrink"></image>
				<view class="flex-1">
					<view class="d-flex a-center">
						<text class="font-md text-danger">{{order.title}}</text>
						<text class="font-md text-light-muted ml-auto">￥{{order.pprice}}</text>
					</view>
					<view class="d-flex">
						<text class="font text-light-muted">{{order.attrs}}</text>
						<text class="font-md text-light-muted ml-auto">x{{order.num}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="d-flex a-center p-2">
			<text class="text-dark font-md ml-auto">
				共{{item.total_num}}件商品,合计: ￥{{item.total_price}}元
			</text>
		</view>
		<view class="d-flex j-end a-center px-2 pb-2">
			<view class="rounded border border-light-secondary py-1 px-2 text-secondary" hover-class="bg-light-secondary" @click.stop="openAfterSale">申请售后</view>
			<view class="ml-2 rounded border border-light-secondary py-1 px-2 text-secondary" hover-class="bg-light-secondary" @click.stop="openLogistics">查看物流</view>
			<view class="ml-2 rounded border border-light-secondary py-1 px-2 text-secondary" hover-class="bg-light-secondary">确认收货</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				index: Number,
			}
		},
		methods: {
			openDetail() {
				uni.navigateTo({
					url: '/pages/order-detail/order-detail',
				});
			},
			openLogistics() {
				uni.navigateTo({
					url: '/pages/logistics-detail/logistics-detail',
				});
			},
			openAfterSale() {
				uni.navigateTo({
					url: '/pages/after-sale/after-sale',
				});
			},
		}
	}
</script>

<style>
</style>
