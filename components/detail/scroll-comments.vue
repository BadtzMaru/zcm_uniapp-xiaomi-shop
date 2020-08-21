<template>
	<view class="p-2">
		<scroll-view scroll-x class="scroll-row ">
			<view v-for="(item,index) in comments" :key="index" class="scroll-row-item rounded bg-light-secondary mr-2 p-2" style="width: 620rpx;height: 380rpx;">
				<view class="d-flex a-center mb-1">
					<image :src="item.userpic" mode="widthFix" style="width: 70rpx;height: 70rpx;" class="rounded-circle"></image>
					<view class="ml-2">
						<text class="font-md line-h">{{item.username}}</text>
						<text class="d-block font text-light-muted line-h">{{item.create_time}}</text>
					</view>
					<view class="iconfont icon-dianzan text-light-muted font pl-1 ml-auto">
						{{item.goods_num}}
					</view>
				</view>
				<text class="d-block font-md mb-2">
					{{item.context}}
				</text>
				<view class="row">
					<view v-for="(img,i) in item.imglist" :key="i" class="span24-8 px-2">
						<image :src="img" mode="widthFix" style="height: 115rpx;" class="rounded"></image>
					</view>
				</view>
			</view>
		</scroll-view>
		<navigator url="/pages/detail-comment/detail-comment">
			<view class="d-flex a-center j-center py-2 mt-2 text-primary" hover-class="bg-light-secondary">
				更多评论<view class="iconfont icon-you"></view>
			</view>
		</navigator>
	</view>
</template>

<script>
	export default {
		props: ['comments'],
	}
</script>

<style>
</style>
