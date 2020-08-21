<template>
	<view>
		<view class="d-flex flex-column a-center j-center py-5 my-3">
			<text class="text-light-muted font-md">支付金额</text>
			<price priceSize="font-lg" unitSize="font-md">38.00</price>
		</view>
		<view class="px-5">
			<label>
				<uni-list-item showExtraIcon leftIcon="icon-zhifubao text-primary" title="支付宝支付" note="推荐使用支付宝支付" leftIconStyle="font-size:60rpx">
					<radio slot="right" color="#FD6801" value="1"></radio>
				</uni-list-item>
			</label>
			<label>
				<uni-list-item showExtraIcon leftIcon="icon-weixinzhifu text-success" title="微信支付"  leftIconStyle="font-size:60rpx">
					<radio slot="right" color="#FD6801" value="2"></radio>
				</uni-list-item>
			</label>
			<view class="main-bg-color text-white font-md w-100 py-2 d-flex a-center j-center rounded mt-3" hover-class="main-bg-hover-color" @click="submit">确认支付</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/common/price.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			price,
			uniListItem,
		},
		data() {
			return {
				
			}
		},
		methods: {
			submit() {
				uni.navigateTo({
					url:'../pay-result/pay-result',
				});
			},
		},
	}
</script>

<style>

</style>
