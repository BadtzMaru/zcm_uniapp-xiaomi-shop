<template>
	<view>
		<block v-for="(item,index) in list" :key="index">
			<uni-swipe-action>
				<uni-swipe-action-item :options="options" @click="bindClick($event,index)">
					<uni-list-item style="width: 100%;" @click="choose(item)">
						<view class="text-secondary">
							<view class="d-flex a-center">
								<text class="main-text-color">{{item.name}}</text>
								{{item.phone}}
								<text class="main-text-color" v-if="item.isdefault">[默认]</text>
							</view>
							<view>{{item.path}}</view>
							<view>{{item.detailPath}}</view>
						</view>
					</uni-list-item>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</block>
		
	</view>
</template>

<script>
	import uniListItem from '@/components/uni-ui/uni-list-item/uni-list-item.vue';
	import uniSwipeAction from '@/components/uni-ui/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from "@/components/uni-ui/uni-swipe-action-item/uni-swipe-action-item.vue";
	import {mapState,mapMutations} from 'vuex';
	export default {
		components: {
			uniListItem,
			uniSwipeAction,
			uniSwipeActionItem,
		},
		data() {
			return {
				options: [
					{
						text: '修改',
						style: {backgroundColor: '#007aff',}
					},
					{
						text: '删除',
						style: {backgroundColor: '#dd524d',}
					},
				],
				isChoose: false,
			}
		},
		computed: {
			...mapState({
				'list': state=>state.path.list,
			}),
		},
		methods: {
			...mapMutations(['delPath']),
			bindClick(value,i) {
				switch(value.index) {
					case 0:
						// 修改
						let obj = JSON.stringify({
							index: i,
							item: this.list[i],
						});
						setTimeout(()=>{
							uni.navigateTo({
								url: '../user-path-edit/user-path-edit?data='+obj,
							});
						},50);
						break;
					case 1:
						// 删除
						uni.showModal({
							content: '要删除该收获地址吗?',
							success: (res)=>{
								if (res.confirm) {
									this.delPath(i);
									uni.showToast({
										title: '删除成功',
									});
								}
							},
						});
						break;
				}
			},
			// 选择收获地址
			choose(item) {
				if (this.isChoose) {
					// 通知订单提交页修改收货地址
					uni.$emit('choosePath',item);
					// 关闭当前页面
					uni.navigateBack({
						delta: 1
					});
				}
			},
		},
		onLoad(e) {
			if (e.type === 'choose') {
				this.isChoose = true;
			}
		},
		// 监听导航栏按钮点击
		onNavigationBarButtonTap(e) {
			if(e.index===0) {
				uni.navigateTo({
					url:'../user-path-edit/user-path-edit'
				});
			}
		},
	}
</script>

<style>

</style>
