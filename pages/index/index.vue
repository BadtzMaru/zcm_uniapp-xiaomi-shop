<template>
	<view>
		<!-- 顶部选项卡 -->
		<scroll-view :scroll-with-animation="true" :scroll-into-view="scrollinto" scroll-x class="scroll-row border-bottom" style="height: 80rpx;">
			<view :id="'tab'+index" @click="changeTab(index)" :class="tabIndex===index?'main-text-color':''" class="scroll-row-item px-3" style="height: 80rpx;line-height: 80rpx;" v-for="(item,index) in tabBars" :key="index">
				<text class="font-md">{{item.name}}</text>
			</view>
		</scroll-view>
		<!-- swiper -->
		<swiper :current="tabIndex" :style="'height: '+scrollH+'px;'" :duration="500" @change="onChangeTab">
			<swiper-item v-for="(item,index) in newsitems" :key="index">
				<scroll-view scroll-y="true" :style="'height: '+scrollH+'px;'" @scrolltolower="loadmore(index)">
					<block v-for="(list,listIndex) in item.list" :key="listIndex">
						<template v-if="list.type==='swiper'">
							<!-- 轮播图组件 -->
							<swiper-image :resdata="list.data" />
						</template>
						<template v-else-if="list.type==='indexnavs'">
							<!-- 首页分类 -->
							<index-nav :resdata="list.data" />
							<!-- 全局分割线 -->
							<divider />
						</template>
						<template v-else-if="list.type==='threeAdv'">
							<!-- 三图广告 -->
							<three-adv :resdata="list.data" />
							<!-- 全局分割线 -->
							<divider />
						</template>
						<!-- 大图广告位 -->
						<!-- <card headTitle="每日精选" bodyCover="/static/images/demo/demo4.jpg" /> -->
						<template v-else-if="list.type==='list'">
							<!-- 公共列表组件 -->
							<view class="row j-sb">
								<block v-for="(item2,index2) in list.data" :key="index2">
									<common-list :item="item2" :index="index2"></common-list>
								</block>
							</view>
						</template>
					</block>
					<!-- 上拉加载更多 -->
					<divider />
					<view class="d-flex a-center j-center text-light-muted font-md py-3">
						{{item.loadtext}}
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	// 模拟后端获取数据
	let demoTabBars = [
		{
			name: '关注'
		},
		{
			name: '推荐'
		},
		{
			name: '体育'
		},
		{
			name: '热点'
		},
		{
			name: '娱乐'
		},
		{
			name: '军事'
		},
		{
			name: '历史'
		},
		{
			name: '本地'
		},
	]
	let demo1 = [
		{
			type: "swiper",
			data:  [
				{src: "/static/images/demo/demo4.jpg"},
				{src: "/static/images/demo/demo4.jpg"},
				{src: "/static/images/demo/demo4.jpg"},
			],
		},
		{
			type: "indexnavs",
			data: [
				{src: "/static/images/indexnav/1.png",text: "新品发布"},
				{src: "/static/images/indexnav/2.gif",text: "小米众筹"},
				{src: "/static/images/indexnav/3.gif",text: "以旧换新"},
				{src: "/static/images/indexnav/4.gif",text: "一分换团"},
				{src: "/static/images/indexnav/5.gif",text: "超值特卖"},
				{src: "/static/images/indexnav/6.gif",text: "小米秒杀"},
				{src: "/static/images/indexnav/7.gif",text: "真心想要"},
				{src: "/static/images/indexnav/8.gif",text: "电视热卖"},
				{src: "/static/images/indexnav/9.gif",text: "家电热卖"},
				{src: "/static/images/indexnav/10.gif",text: "米粉卡"},
			],
		},
		{
			type: "threeAdv",
			data: {
				big: {src:"/static/images/demo/demo1.jpg"},
				smallTop: {src:"/static/images/demo/demo2.jpg"},
				smallBottom: {src:"/static/images/demo/demo3.jpg"},
			},
		},
		{
			type: "list",
			data: [
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
			]
		}
	]
	let demo2 = [
		{
			type: "swiper",
			data:  [
				{src: "/static/images/demo/demo4.jpg"},
				{src: "/static/images/demo/demo4.jpg"},
				{src: "/static/images/demo/demo4.jpg"},
			],
		},
		{
			type: "indexnavs",
			data: [
				{src: "/static/images/indexnav/1.png",text: "新品发布"},
				{src: "/static/images/indexnav/2.gif",text: "小米众筹"},
				{src: "/static/images/indexnav/3.gif",text: "以旧换新"},
				{src: "/static/images/indexnav/4.gif",text: "一分换团"},
				{src: "/static/images/indexnav/5.gif",text: "超值特卖"},
				{src: "/static/images/indexnav/6.gif",text: "小米秒杀"},
				{src: "/static/images/indexnav/7.gif",text: "真心想要"},
				{src: "/static/images/indexnav/8.gif",text: "电视热卖"},
				{src: "/static/images/indexnav/9.gif",text: "家电热卖"},
				{src: "/static/images/indexnav/10.gif",text: "米粉卡"},
			],
		},
	]
	import commonList from '@/components/common/common-list.vue'
	import card from '@/components/common/card.vue'
	import threeAdv from '@/components/index/three-adv.vue'
	import indexNav from '@/components/index/index-nav.vue'
	import swiperImage from '@/components/index/swiper-image.vue'
	export default {
		components: {
			swiperImage,
			indexNav,
			threeAdv,
			card,
			commonList,
		},
		data() {
			return {
				scrollinto: '',
				scrollH: 500,
				tabIndex: 0,
				tabBars: [],
				newsitems: [],
			}
		},
		onLoad() {
			// 获取可视区域高度
			uni.getSystemInfo({
				success: (res)=>{
					this.scrollH = res.windowHeight - uni.upx2px(82)
				}
			})
			// 初始化事件
			this.__init()
		},
		methods: {
			// 初始化事件
			__init() {
				// 获取顶部选项卡
				this.tabBars = demoTabBars
				// 根据顶部选项卡生成页面
				let arr = []
				for (let i=0;i<this.tabBars.length;i++) {
					let obj = {
						list: [],
						loadtext: '上拉加载更多',
					}
					// 获取首屏数据
					if (i===0) {
						obj.list = demo1
					}
					arr.push(obj)
				}
				this.newsitems = arr
			},
			// 切换选项卡
			changeTab(index) {
				if (this.tabIndex === index) return
				this.tabIndex = index
				this.scrollinto = 'tab'+index
				this.addData()
			},
			// 监听滑动列表
			onChangeTab(e) {
				this.changeTab(e.detail.current)
			},
			// 加载数据
			addData() {
				// 拿到当前索引
				let index = this.tabIndex
				// 请求数据库
				this.newsitems[index].list = demo2
			},
			// 上拉加载更多
			loadmore(index) {
				let item = this.newsitems[index]
				// 是否处于可加载状态
				if (item.loadtext !== '上拉加载更多') return
				// 模拟加载
				item.loadtext = '加载中...'
				setTimeout(()=>{
					// 加载数据
					item.list = [...item.list,...demo2,]
					// 恢复状态
					item.loadtext = '上拉加载更多'
				},2000)
			}
		},
	}
</script>

<style>
	
</style>
