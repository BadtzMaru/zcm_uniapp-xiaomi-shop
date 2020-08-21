<template>
	<view class="d-flex flex-column" style="height: 100%;">
		<!-- 选项卡 -->
		<view class="d-flex bg-white a-center font-md text-muted border-top border-bottom border-light-secondary">
			<view :class="tabIndex===index?'tabactive':''" v-for="(item,index) in tabBars" :key="index" class="flex-1 d-flex a-center j-center py-2" @tap="changeTab(index)">{{item.name}}</view>
		</view>
		<scroll-view scroll-y class="flex-1" style="background-color: #F5F5F5;">
			<!-- 订单列表 -->
			<block v-for="(tab,tabI) in tabBars" :key="tabI">
				<view class="position-relative" v-show="tabI === tabIndex" style="min-height: 440rpx;">
					<template v-if="tab.list.length > 0">
						<!-- 优惠卷列表 -->
						<view class="p-3">
							
							<coupon v-for="(item,index) in tab.list" :key="index" :item="item" :index="index"></coupon>
						</view>
					</template>
					<template v-else>
						<!-- 默认无 -->
						<no-thing :icon="tab.no_thing" :msg="tab.msg"></no-thing>
					</template>
					
					
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	import coupon from '@/components/order-coupon/coupon.vue';
	import noThing from '@/components/common/no-thing.vue';
	export default {
		components: {
			noThing,
			coupon,
		},
		data() {
			return {
				tabIndex: 0,
				tabBars: [
					{
						name: '可用',
						no_thing: 'no_pay',
						msg: '您还没有可用优惠卷',
						list: [
							{
								title: '第三季仿微信立减100元',
								start_time: '2020-08-01',
								end_time: '2020-10-15',
								price: 100,
								desc: '满300可用',
								status: true,
								disabled: false,
							},
							{
								title: '第三季仿微信立减100元',
								start_time: '2020-08-01',
								end_time: '2020-10-15',
								price: 100,
								desc: '满300可用',
								status: true,
								disabled: true,
							},
							{
								title: '第三季仿微信立减100元',
								start_time: '2020-08-01',
								end_time: '2020-10-15',
								price: 100,
								desc: '满300可用',
								status: true,
								disabled: true,
							},
						],
					},
					{
						name: '已失效',
						no_thing: 'no_pay',
						msg: '没有失效的优惠卷',
						list: [
							{
								title: '第三季仿微信立减100元',
								start_time: '2020-08-01',
								end_time: '2020-10-15',
								price: 100,
								desc: '满300可用',
								status: false,
								disabled: true,
							},
							{
								title: '第三季仿微信立减100元',
								start_time: '2020-08-01',
								end_time: '2020-10-15',
								price: 100,
								desc: '满300可用',
								status: false,
								disabled: true,
							},
						],
					},
					
				],
			}
		},
		methods: {
			changeTab(index) {
				this.tabIndex = index;
			},
		},
	}
</script>

<style>
	.tabactive{
		border-bottom: 5rpx solid #FD6801;
		color: #FD6801;
		margin-bottom:  -5rpx;
	}
</style>
