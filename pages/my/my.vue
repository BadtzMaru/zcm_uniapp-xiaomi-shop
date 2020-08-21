<template>
	<view class="animated fadeIn faster">
		<!-- 头部 -->
		<view class="position-relative d-flex a-center" style="height: 320rpx;">
			<loading-plus v-if="beforeReady"></loading-plus>
			<!-- 消息列表 -->
			<view @click="navigate('msg-list')" class="iconfont icon-xiaoxi position-absolute text-white" style="font-size: 50rpx;top: 75rpx;right: 20rpx;z-index: 100;"></view>
			<image src="../../static/images/bg.jpg" style="height: 320rpx;width: 100%;"></image>
			<view class="d-flex a-center position-absolute left-0 right-0" style="bottom: 50rpx;">
				<image src="../../static/images/demo/demo6.jpg" style="height: 145rpx;width: 145rpx;border: 5rpx solid;" class="rounded-circle border-light ml-4"></image>
				<navigator url="../login/login">
					<view class="ml-2 text-white font-md">测试昵称</view>
				</navigator>
				<view class="d-flex a-center j-center a-self-end ml-auto px-2" style="height: 70rpx;background-color: #FFD43F;color: #CC4A00;border-top-left-radius: 40rpx;border-bottom-left-radius: 40rpx;">
					<view class="line-h iconfont icon-huangguan mr-1"></view>
					会员积分 1.99
				</view>
			</view>
		</view>
		<!-- 图标分类 -->
		<card>
			<view slot="title" class="d-flex a-center j-sb">
				<text class="font-md font-weight">我的订单</text>
				<view class="text-secondary font" @click="navigate('order')">
					全部订单
					<text class="iconfont icon-you font"></text>
				</view>
			</view>
			<view class="d-flex a-center">
				<view class="flex-1 d-flex flex-column a-center j-center" hover-class="bg-light-secondary" v-for="i in 4" :key="i">
					<view class="iconfont icon-cpu font-lg line-h py-3"></view>
					<view>待付款</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<uni-list-item showExtraIcon leftIconStyle="color:#FDBF2E;" leftIcon="icon-VIP" title="小米会员"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#FCBE2D;" leftIcon="icon-huangguan" title="会员中心"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#FA6C5E;" leftIcon="icon-service" title="服务中心"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#FE8B42;" leftIcon="icon-home" title="小米之家"></uni-list-item>
		<uni-list-item showExtraIcon leftIconStyle="color:#9ED45A;" leftIcon="icon-gengduo" title="更多功能"></uni-list-item>
		<divider></divider>
		<uni-list-item showExtraIcon leftIconStyle="color:#808C98;" leftIcon="icon-icon_set_up" title="更多设置" @click="navigate('user-path-list')"></uni-list-item>
		<!-- view底部 -->
	</view>
</template>

<script>
	import loading from '../../common/mixin/loading.js';
	import card from '@/components/common/card.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	export default {
		mixins: [loading],
		components: {
			card,
			uniListItem,
		},
		data() {
			return {
				
			};
		},
		methods: {
			navigate(path) {
				if (!path) return;
				uni.navigateTo({
					url:`/pages/${path}/${path}`,
				})
			},
		},
	}
</script>

<style>

</style>
