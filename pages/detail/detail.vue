<template>
	<view>
		<!-- 商品详情大图 -->
		<swiper-image :resdata="banners" height="750" :preview="true"></swiper-image>
		<!-- 基础详情 -->
		<base-info :detail="detail"></base-info>
		<!-- 滚动商品特性 -->
		<scroll-attrs :baseAttrs="baseAttrs"></scroll-attrs>
		<!-- 属性选择 -->
		<view class="p-2">
			<view class="rounded border bg-light-secondary">
				<uni-list-item @click="show('attr')">
					<view class="d-flex">
						<text class="mr-2 text-muted">已选</text>
						<text>火焰红 64G 标配</text>
					</view>
				</uni-list-item>
				<uni-list-item @click="show('express')">
					<view class="d-flex">
						<text class="mr-2 text-muted">配送</text>
						<text class="mr-2">北京 东城区</text>
						<text class="main-text-color">配送</text>
					</view>
				</uni-list-item>
				<uni-list-item extraWidth="15%" @click="show('service')">
					<view class="d-flex a-center">
						<view class="text-muted font d-flex a-center mr-2">
							<view class="iconfont icon-finish main-text-color"></view>
							小米自营
						</view>
						<view class="text-muted font d-flex a-center mr-2">
							<view class="iconfont icon-finish main-text-color"></view>
							小米发货
						</view>
						<view class="text-muted font d-flex a-center mr-2">
							<view class="iconfont icon-finish main-text-color"></view>
							七天无理由退货
						</view>
					</view>
				</uni-list-item>
			</view>
		</view>
		<!-- 横向滚动评论 -->
		<scroll-comments :comments="comments"></scroll-comments>
		<!-- 商品详情 -->
		<view class="py-4">
			<u-parse className="uparse" :content="context" @preview="preview" @navigate="navigate"></u-parse>
		</view>
		<!-- 热门推荐 -->
		<card headTitle="热门推荐" :headTitleWeight="false" :headBorderBottom="false">
			<view class="row j-sb">
				<common-list v-for="(item,index) in hotList" :key="index" :item="item" :index="index"></common-list>
			</view>
		</card>
		<!-- 底部操作条 -->
		<bottom-btn @show="show('attr')"></bottom-btn>
		<!-- 属性选择 -->
		<common-popup :popupClass="popup.attr" @hide="hide('attr')">
			<view class="d-flex a-center" style="height: 275rpx;">
				<image src="/static/images/demo/cate_01.png" mode="widthFix" style="width: 180rpx;height: 180rpx;" class="border rounded"></image>
				<view class="pl-2">
					<price priceSize="font-lg" unitSize="font">2635</price>
					<text class="d-flex">
						火焰红 64GB 标配
					</text>
				</view>
			</view>
			<scroll-view scroll-y class="w-100" style="height: 660rpx;">
				<card v-for="(item,index) in selects" :key="index" :headTitle="item.title" :headTitleWeight="false" :headBorderBottom="false">
					<zcm-radio-group :label="item" :selected.sync="item.selected"></zcm-radio-group>
				</card>
				<view class="d-flex j-sb a-center p-2 border-top border-light-secondary">
					<text>购买数量</text>
					<uni-number-box :min="1" :value="detail.num" @change="detail.num = $event"></uni-number-box>
				</view>
			</scroll-view>
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="addCart">
				加入购物车
			</view>
		</common-popup>
		<!-- 收获地址 -->
		<common-popup :popupClass="popup.express" @hide="hide('express')">
			<view class="d-flex a-center j-center font-md border-bottom border-light-secondary" style="height: 100rpx;">收货地址</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<uni-list-item v-for="(item,index) in pathList" :key="index">
					<view class="iconfont icon-dingwei font-weight font-md">{{item.name}}</view>
					<view class="font text-light-muted">{{item.path}} {{item.detailPath}}</view>
				</uni-list-item>
			</scroll-view>
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="openCreatePath">
				选择新的地址
			</view>
		</common-popup>
		<!-- 服务说明 -->
		<common-popup :popupClass="popup.service" @hide="hide('service')">
			<view class="d-flex a-center j-center font-md border-bottom border-light-secondary" style="height: 100rpx;">服务说明</view>
			<scroll-view scroll-y class="w-100" style="height: 835rpx;">
				<view class="py-1">
					<view class="d-flex a-center">
						<view class="iconfont icon-finish main-text-color mr-1"></view>
						小米自营
					</view>
					<text class="text-light-muted pl-4">不管买多少,就是不包邮</text>
				</view>
			</scroll-view>
			<view class="main-bg-color text-white font-md d-flex a-center j-center" hover-class="main-bg-hover-color" style="height: 100rpx;margin-left: -30rpx;margin-right: -30rpx;" @tap.stop="hide('service')">
				选择新的地址
			</view>
		</common-popup>
	</view>
</template>

<script>
	var htmlString = `
		<p>
			<img src="https://i8.mifile.cn/v1/a1/9c3e29dc-151f-75cb-b0a5-c423a5d13926.webp">
			<img src="https://i8.mifile.cn/v1/a1/f442b971-379f-5030-68aa-3b0accb8c2b9.webp">
			<img src="https://i8.mifile.cn/v1/a1/63b700b6-643e-ec18-fdf3-da66b4b4173f.webp">
			<img src="https://i8.mifile.cn/v1/a1/e9dbf276-193e-11c4-99a6-3097fde82350.webp">
			<img src="https://i8.mifile.cn/v1/a1/1249d3ee-2990-a2b4-28d9-f719c2417b1f.webp">
			<img src="https://i8.mifile.cn/v1/a1/97c79915-64b2-808c-53b4-4345652a179f.webp">
			<img src="https://i8.mifile.cn/v1/a1/cd0fbe1e-a1b3-a87a-f4a6-6fb08ec54931.webp">
		</p>
	`;
	import swiperImage from '@/components/index/swiper-image.vue';
	import baseInfo from '@/components/detail/base-info.vue';
	import scrollAttrs from '@/components/detail/scroll-attrs.vue';
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import scrollComments from '@/components/detail/scroll-comments.vue';
	import uParse from '@/components/uni-ui/uParse/src/wxParse.vue';
	import card from '@/components/common/card.vue';
	import commonList from '@/components/common/common-list.vue';
	import bottomBtn from '@/components/detail/bottom-btn.vue';
	import commonPopup from '@/components/common/common-popup.vue';
	import price from '@/components/common/price.vue';
	import zcmRadioGroup from '@/components/common/radio-group.vue';
	import uniNumberBox from '@/components/uni-ui/uni-number-box/uni-number-box.vue';
	import {mapState,mapMutations} from 'vuex';
	export default {
		components: {
			swiperImage,
			baseInfo,
			scrollAttrs,
			uniListItem,
			scrollComments,
			uParse,
			card,
			commonList,
			bottomBtn,
			commonPopup,
			price,
			zcmRadioGroup,
			uniNumberBox,
		},
		data() {
			return {
				banners:[
					{ src: 'https://i8.mifile.cn/v1/a1/6d13e060-d5c5-e610-88d0-80816fa2b0ce.webp'},
					{ src: 'https://i8.mifile.cn/v1/a1/aff0b715-e63a-68f3-91b0-46a22543555e.webp'},
				],
				detail:{
					id: 22,
					title:"小米MIX3 6GB+128GB",
					cover:"/static/images/demo/list/1.jpg",
					desc:"磁动力滑盖全面屏 / 前后旗舰AI双摄 / 四曲面彩色陶瓷机身 / 高效10W无线充电",
					pprice:3299,
					num: 1,
					max: 100,
				},
				baseAttrs:[
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
					{ icon:"icon-cpu",title:"CPU",desc:"蛟龙845八核" },
				],
				comments: [
					{
						userpic: '/static/images/demo/demo6.jpg',
						username: '楚绵',
						create_time: '2020-07-04',
						goods_num: 123,
						context: '评论内容评论内容评论内容评论内容评论内容评',
						imglist: [
							'/static/images/demo/demo6.jpg',
							'/static/images/demo/demo6.jpg',
							'/static/images/demo/demo6.jpg',
						],
					},
					{
						userpic: '/static/images/demo/demo6.jpg',
						username: '楚绵',
						create_time: '2020-07-04',
						goods_num: 123,
						context: '评论内容评论内容',
						imglist: [
							'/static/images/demo/demo6.jpg',
							'/static/images/demo/demo6.jpg',
							'/static/images/demo/demo6.jpg',
						],
					},
					{
						userpic: '/static/images/demo/demo6.jpg',
						username: '楚绵',
						create_time: '2020-07-04',
						goods_num: 123,
						context: '评论内容评论内容',
						imglist: [
							'/static/images/demo/demo6.jpg',
							'/static/images/demo/demo6.jpg',
							'/static/images/demo/demo6.jpg',
						],
					}
				],
				context: htmlString,
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
				popup: {
					attr: 'none',
					express: 'none',
					service: 'none',
				},
				selects: [
					{
						title: '颜色',
						selected: 0,
						list: [
							{name: '黄色'},
							{name: '黑色'},
							{name: '粉色'},
						]
					},
					{
						title: '容量',
						selected: 0,
						list: [
							{name: '64GB'},
							{name: '128GB'},
						]
					},
					{
						title: '套餐',
						selected: 0,
						list: [
							{name: '标配'},
							{name: '套餐一'},
							{name: '套餐二'},
						]
					}
				],
				
				// data底部
			}
		},
		computed: {
			...mapState({
				pathList: state=>state.path.list,
			}),
		},
		methods: {
			...mapMutations(['addGoodsToCart']),
			preview(src,e){
				console.log('src: '+src);
			},
			navigate(href,e){
				console.log('href: '+href);
			},
			openCreatePath() {
				uni.navigateTo({
					url:'../user-path-edit/user-path-edit'
				});
				this.hide('express');
			},
			hide(key){
				this.popup[key] = 'hide';
				setTimeout(()=>{
					this.popup[key] = 'none'
				},200);
			},
			show(key){
				this.popup[key] = 'show';
			},
			// 加入购物车
			addCart() {
				// 组织数据
				let goods = this.detail;
				goods['checked'] = false;
				goods['attrs'] = this.selects;
				// 加入购物车
				this.addGoodsToCart(goods);
				// 隐藏筛选框
				this.hide('attr');
				// 成功提示
				uni.showToast({
					title:'加入成功'
				});
			}
			// methods底部
		},
		// 监听页面返回事件
		onBackPress() {
			// 关闭模态框
			for (let key in this.popup) {
				if (this.popup[key] !== 'none') {
					this.hide(key);
					return true;
				}
			}
		},
	}
</script>

<style>
	.uparse .p{
		padding: 0!important;
	}
	.uparse view{
		line-height: 0!important;
	}
</style>
