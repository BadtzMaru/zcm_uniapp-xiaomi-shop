<template>
	<view class="row p-2 border-bottom border-light-secondary animated fadeIn faster">
		<view class="span-6">
			<image :src="item.titlepic" mode="widthFix" class="w-100"></image>
		</view>
		<view class="span-14 pl-3 d-flex flex-column">
			<view class="font-md font-weight">{{item.title}}</view>
			<view class="font text-light-muted line-h-md mb-auto">{{item.desc}}</view>
			<price>{{item.pprice}}</price>
			<view class="font-sm text-light-muted">
				{{item.comment_num}} 条评论 {{item.good_num}}满意
			</view>
		</view>
	</view>
</template>

<script>
	import price from '@/components/common/price.vue'
	export default {
		components: {
			price
		},
		props: {
			item: Object,
			index: Number,
		}
	}
</script>

<style>
</style>
