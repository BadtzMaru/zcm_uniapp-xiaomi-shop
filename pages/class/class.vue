<template>
	<view class="animated fadeIn faster d-flex border-top border-light-secondary" style="height: 100%;box-sizing: border-box;">
		<loading-plus v-if="beforeReady"></loading-plus>
		<!-- <loading :show="showLoading"></loading> -->
		<scroll-view :scroll-top="leftScrollTop" id="leftScroll" scroll-y style="flex: 1;height: 100%;" class="border-right border-light-secondary">
			<view @tap="changeCate(index)" v-for="(item,index) in cate" :key="index" hover-class="bg-light-secondary" class="border-bottom border-light-secondary py-1 left-scroll-item">
				<view class="py-1 font-md text-muted text-center" :class="activeIndex===index?'class-active':''" >{{item.name}}</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y style="flex: 3.5;height: 100%;" :scroll-top="rightScrollTop" scroll-with-animation @scroll="onRightScroll">
			<view class="row right-scroll-item" v-for="(item,index) in list" :key="index">
				<view class="span24-8 text-center py-2" v-for="(item2,index2) in item.list" :key="index2">
					<image :src="item2.src" style="width: 120rpx;height: 120rpx;"></image>
					<text class="d-block">{{item2.name}}</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import loading from '../../common/mixin/loading.js';
	export default {
		mixins: [loading],
		data() {
			return {
				// 当前选中的分类
				showLoading: true,
				activeIndex: 0,
				cate: [],
				list: [],
				leftDomsTop: [],
				rightDomsTop: [],
				rightScrollTop: 0,
				cateItemHeight: 0,
				leftScrollTop: 0,
			}
		},
		methods: {
			// 获取节点信息
			getElInfo(obj = {}) {
				return new Promise((res,rej)=>{
					let option = {
						size: obj.size ? true : false,
						rect: obj.rect ? true : false,
						scrollOffset: obj.scrollOffset ? true : false,
					}
					const query = uni.createSelectorQuery().in(this)
					let q = obj.all? query.selectAll(`.${obj.all}-scroll-item`) : query.select('#leftScroll')
					q.fields(option,data=>{
						res(data)
					}).exec()
				})
			},
			// 点击左边分类
			changeCate(index) {
				this.activeIndex = index
				// 右边scroll-view滚动到对应区块
				this.rightScrollTop = this.rightDomsTop[index]
			},
			getData() {
				for(let i=0;i<20;i++) {
					this.cate.push({
						name: '分类'+i
					})
					this.list.push({
						list: []
					})
				}
				for (let i=0;i<this.list.length;i++) {
					for (let j = 0; j < 23; j++) {
						this.list[i].list.push(
							{
								src: '/static/images/demo/cate_03.png',
								name: `分类${i}-商品${j}`,
							}
						)
					}
				}
				this.$nextTick(()=>{
					this.showLoading = false
				})
			},
			// 监听右边滚动事件
			async onRightScroll(e) {
				// 匹配当前scrollTop所处的索引
				this.rightDomsTop.forEach((v,k)=>{
					if (v < e.detail.scrollTop + 3) {
						this.activeIndex = k
						return false
					}
				})
			},
		},
		onLoad() {
			this.getData()
		},
		onReady() {
			this.getElInfo({
				all: 'left',
				size: true,
				rect: true,
			}).then(data=>{
				this.leftDomsTop = data.map(v=>{
					this.cateItemHeight = v.height
					return v.top
				})
			});
			this.getElInfo({
				all: 'right',
				size: false,
				rect: true,
			}).then(data=>{
				this.rightDomsTop = data.map(v=>v.top)
			});
		},
		watch: {
			async activeIndex(newValue,oldValue) {
				// 获取scroll-view高度,scrollTop
				let data = await this.getElInfo({
					size: true,
					scrollOffset: true,
				})
				let H = data.height
				let ST = data.scrollTop
				// 下边
				if ( (this.leftDomsTop[newValue]+this.cateItemHeight) > (H+ST) ) {
					return this.leftScrollTop = this.leftDomsTop[newValue] + this.cateItemHeight - H
				}
				// 上边
				if (ST > this.leftDomsTop[newValue]) {
					this.leftScrollTop = this.leftDomsTop[newValue]
				}
			}
		}
		
	}
</script>

<style>
	.class-active{
		border-left: 8rpx solid #FD6801;
		color: #FD6801!important;
	}
</style>
