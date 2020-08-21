<template>
	<view style="background-color: #F5F5F5;min-height: 100%;height: auto;">
		<!-- 地址选择 -->
		<view class="main-bg-color text-white d-flex a-center px-3" style="height: 250rpx;" hover-class="main-bg-hover-color" @click="openPathList">
			<view>
				<template v-if="path">
					<view class="font-weight font-md d-flex a-center font-lg" >
						{{path.name}} {{path.phone}}
						<view v-if="path.isdefault" class="border border-white rounded px-1 font ml-2">默认</view>
					</view>
					<view class="font">
						{{path.path}} {{path.detailPath}}
					</view>
				</template>
				<template v-else>
					<view class="font-weight font-md d-flex a-center font-lg">
						请选择收获地址
					</view>
				</template>
				
			</view>
			<view class="iconfont icon-you ml-auto"></view>
		</view>
		<view style="border-top-right-radius: 25rpx;border-top-left-radius: 25rpx;margin-top: -25rpx;overflow: hidden;">
			<view class="bg-white">
				<uni-list-item showArrow>
					<view class="d-flex a-center">
						<image src="/static/images/demo/demo6.jpg" style="width: 100rpx;height: 100rpx;" class="rounded mr-2"></image>
						<image src="/static/images/demo/demo6.jpg" style="width: 100rpx;height: 100rpx;" class="rounded mr-2"></image>
						<image src="/static/images/demo/demo6.jpg" style="width: 100rpx;height: 100rpx;" class="rounded mr-2"></image>
					</view>
					<view slot="rightContent">共3件</view>
				</uni-list-item>
				<uni-list-item title="商品总价" :showArrowIcon="false">
					<view slot="rightContent" >
						<price color="text-dark">20.00</price>
					</view>
				</uni-list-item>
				<uni-list-item title="运费" :showArrowIcon="false">
					<view slot="rightContent">包邮</view>
				</uni-list-item>
				<navigator url="../order-coupon/order-coupon">
					<uni-list-item  title="优惠券" :showArrowIcon="false">
						<view slot="rightContent" class="text-light-muted">无可用</view>
					</uni-list-item>
				</navigator>
				
				<uni-list-item>
					<text class="main-text-color">小计</text>
					<view slot="rightContent">
						<price>20.00</price>
					</view>
				</uni-list-item>
				<divider></divider>
				<uni-list-item title="发票" extraWidth="40%" @click="openOrderInvoice">
					<view slot="rightContent">电子发票-个人</view>
				</uni-list-item>
			</view>
		</view>
		<view class="position-fixed d-flex a-center j-end border bottom-0 left-0 right-0 bg-white p-2 font-md">
			合计: 
			<view class="ml-2">
				<price>24.00</price>
			</view>
			<view class="ml-1 px-2 py-1 main-bg-color text-white" hover-class="main-bg-hover-color" style="border-radius: 80rpx;" @click="openPayMethods">去支付</view>
		</view>
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import price from '@/components/common/price.vue';
	import {mapGetters} from 'vuex';
	export default {
		components: {
			uniListItem,
			price,
		},
		data() {
			return {
				path: false,
			}
		},
		computed:{
			...mapGetters(['defaultPath']),
		},
		methods: {
			openPathList() {
				uni.navigateTo({
					url: '../user-path-list/user-path-list?type=choose',
				});
			},
			openOrderInvoice() {
				uni.navigateTo({
					url: '../order-invoice/order-invoice',
				});
			},
			openPayMethods() {
				uni.navigateTo({
					url: '../pay-methods/pay-methods',
				});
			},
		},
		onLoad() {
			if (this.defaultPath.length) {
				this.path = this.defaultPath[0];
			}
			// 开起监听选择收货地址事件
			uni.$on('choosePath',(res)=>{
				this.path = res;
			});
		},
		onUnload() {
			// 关闭监听选择收获地址事件
			uni.$off('choosePath',(e)=>{
				console.log('关闭监听收获地址');
			});
		},
	}
</script>

<style>

</style>
