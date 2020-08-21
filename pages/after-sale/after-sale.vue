<template>
	<view>
		<divider></divider>
		<card headTitle="申请售后的产品" bodyPadding cardStyle="background:#ffffff;">
			<view class="d-flex a-center px-3 py-2">
				<image src="../../static/images/demo/cate_01.png" mode="widthFix" style="width: 100rpx;height: 100rpx;"></image>
				<view class="flex-1 ml-3">
					<view class="font-lg line-h-md">商品名称</view>
					<view class="font-md text-light-muted">维修服务: 剩余111天</view>
				</view>
			</view>
		</card>
		<divider></divider>
		<card headTitle="服务类型" bodyPadding cardStyle="background:#ffffff;">
			<zcm-radio-group :label="label1" :selected.sync="label1.selected"></zcm-radio-group>
		</card>
		<divider></divider>
		<card headTitle="问题描述" bodyPadding cardStyle="background:#ffffff;">
			<textarea class="border rounded p-2" placeholder="请详细买描述你遇到的问题" :maxlength="200" style="width: 100%;height: 300rpx;box-sizing: border-box;"/>
		</card>
		<view class="p-3">
			<view class="rounded main-bg-color text-white text-center py-2 font-md" hover-class="main-bg-hover-color">下一步</view>
		</view>
	</view>
</template>

<script>
	import card from '@/components/common/card.vue';
	import zcmRadioGroup from '../../components/common/radio-group.vue';
	export default {
		components: {
			card,
			zcmRadioGroup,
		},
		data() {
			return {
				label1: {
					selected: 0,
					list: [
						{name: '维修'},
					],
				},
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #EEEEEE;
	}
</style>
