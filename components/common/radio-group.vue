<template>
	<view class="row">
		<view v-for="(item,index) in label.list" :key="index" class="span24-8 px-2 mb-2">
			<view class="border px-2 py-1 bg-light-secondary text-center font-md  rounded" :class="label.selected===index?'radio-active':'border-light-secondary'" @tap="changeRadio(index)">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			label: Object,
		},
		methods: {
			changeRadio(index) {
				this.$emit('update:selected',index)
			}
		}
	}
</script>

<style>
	.radio-active{
		background-color: #FCE0D5!important;
		color: #EB7320!important;
		border-color: #EB7320!important;
		border: 1rpx solid #EB7320;
	}
</style>
