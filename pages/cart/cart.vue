<template>
	<view class="animated fadeIn faster" style="background-color: #F5F5F5;">
		<loading-plus v-if="beforeReady"></loading-plus>
		<uni-nav-bar :rightText="isedit?'完成':'编辑'" title="购物车" statusBar @clickRight="isedit=!isedit" :fixed="true"></uni-nav-bar>
		<!-- 购物车为空 -->
		<view class="py-5 d-flex a-center j-center bg-white" v-if="disableSelectAll">
			<view class="iconfont icon-gouwuche text-light-muted" style="font-size: 50rpx;"></view>
			<text class="text-light-muted mx-2">购物车还是为空</text>
			<view class="px-2 py-1 border border-light-secondary rounded" hover-class="bg-light-secondary">去逛逛</view>
		</view>
		<!-- 购物车商品列表 -->
		<view class="bg-white px-2" v-else>
			<!-- 列表 -->
			<view class="d-flex a-center py-3 border-bottom border-light-secondary" v-for="(item,index) in list" :key="index">
				<label class="d-flex a-center j-center flex-shrink" style="width: 80rpx;height: 80rpx;" @click="selectItem(index)">
					<radio :value="item.id" color="#FD6801" :checked="item.checked"/>
				</label>
				<image :src="item.cover" mode="widthFix" style="width: 150rpx;height: 150rpx;" class="border border-light-secondary rounded p-2 flex-shrink"></image>
				<view class="flex-1 d-flex flex-column pl-2">
					<view class="text-dark" style="font-size: 35rpx;">{{item.title}}</view>
					<!-- 规格属性 -->
					<view @click.stop="doShowPopup(index)" class="d-flex a-center text-light-muted mb-1" :class="isedit?'p-1 bg-light-secondary mb-2':''">
						<text class="mr-1" v-for="(attr,attrIndex) in item.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
						<view v-if="isedit" class="iconfont icon-bottom font ml-auto"></view>
					</view>
					<view class="mt-auto d-flex j-sb">
						<price>{{item.pprice}}</price>
						<view class="a-self-end">
							<uni-number-box :min="item.minnum" :value="item.num" :max="item.maxnum" @change="changeNum($event,item,index)"></uni-number-box>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 为你推荐 -->
		<view class="text-center main-text-color font-md font-weight mt-5">为你推荐</view>
		<view class="position-relative d-flex a-center j-center text-secondary mb-3">
			<view style="background-color: #F5F5F5;z-index: 2;" class="px-2 position-relative">买了人还买了</view>
			<view class="position-absolute" style="height: 1rpx;left: 0;right: 0;background-color: #DDDDDD;"></view>
		</view>
		<view class="row j-sb bg-white">
			<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index"></common-list>
		</view>
		<!-- 占位 -->
		<view style="height: 100rpx;"></view>
		<!-- 合计 -->
		<view class="d-flex a-stretch position-fixed left-0 right-0 bottom-0 border-top border-light-secondary bg-white" style="height: 100rpx;z-index: 1000;">
			<label @click="doSelectAll" class="d-flex a-center j-center flex-shrink" style="width: 120rpx;">
				<radio color="#FD6801" :checked="checkedAll" :disabled="disableSelectAll"/>
			</label>
			<template v-if="!isedit">
				<view class="flex-1 d-flex a-center j-center font-md">
					合计<price>{{totalPrice}}</price>
				</view>
				<view class="flex-1 d-flex a-center j-center main-bg-color text-white font-md" hover-class="main-bg-hover-color" @tap="orderConfirm">
					结算
				</view>
			</template>
			<template v-else>
				<view class="flex-1 d-flex a-center j-center font-md main-bg-color text-white" hover-class="main-bg-hover-color">
					移入收藏
				</view>
				<view class="flex-1 d-flex a-center j-center bg-danger text-white font-md" hover-class="bg-info" @click="doDelGoods">
					删除
				</view>
			</template>
		</view>
		
		<!-- 属性选择 -->
		<common-popup :popupClass="popupShow" @hide="doHidePopup">
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/demo/cate_01.png" mode="widthFix" style="width: 180rpx;height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2635</price>
					<view class="d-flex">
						<text class="mr-1" v-for="(attr,attrIndex) in popupData.attrs" :key="attrIndex">{{attr.list[attr.selected].name}}</text>
					</view>
				</view>
			</view>
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card v-for="(item,index) in popupData.attrs" :key="index" :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false">
					<zcm-radio-group :label="item" :selected.sync="item.selected"></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="popupData.num" @change="popupData.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="doHidePopup">
				确定
			</view>
		</common-popup>
		<!-- view底部 -->
	</view>
</template>

<script>
	import loading from '../../common/mixin/loading.js';
	import {mapState,mapGetters,mapActions,mapMutations} from 'vuex';
	import uniNavBar from '@/components/uni-ui/uni-nav-bar/uni-nav-bar.vue';
	import price from '@/components/common/price.vue';
	import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
	import card from '@/components/common/card.vue';
	import zcmRadioGroup from '@/components/common/radio-group.vue';
	import commonPopup from '@/components/common/common-popup.vue';
	import commonList from '@/components/common/common-list';
	export default {
		mixins: [loading],
		components: {
			uniNavBar,
			price,
			uniNumberBox,
			card,
			zcmRadioGroup,
			commonPopup,
			commonList,
		},
		data() {
			return {
				beforeReady: true,
				isedit: false,
				hotList: [
					{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹直流变频',
						oprice: 2699,
						pprice: 1399,
					},
					{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹直流变频',
						oprice: 2699,
						pprice: 1399,
					},
					{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹直流变频',
						oprice: 2699,
						pprice: 1399,
					},
					{
						cover: '/static/images/demo/list/1.jpg',
						title: '米家空调',
						desc: '1.5匹直流变频',
						oprice: 2699,
						pprice: 1399,
					},
				],
				// data底部
			}
		},
		computed: {
			...mapState({
				list: state=>state.cart.list,
				popupShow: state=>state.cart.popupShow,
			}),
			...mapGetters(['checkedAll','totalPrice','disableSelectAll','popupData']),
		},
		methods: {
			...mapActions(['doSelectAll','doDelGoods','doShowPopup','doHidePopup']),
			...mapMutations(['selectItem']),
			changeNum(e,item,index){
				item.num = e;
			},
			// 订单结算
			orderConfirm() {
				uni.navigateTo({
					url: '../order-confirm/order-confirm',
				});
			},
			// methods底部
		},
		onReady() {
			setTimeout(()=>{
				this.beforeReady = false;
			},500);
		}
	}
</script>

<style>

</style>
