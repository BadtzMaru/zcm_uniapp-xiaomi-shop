export default {
	state: {
		list:[
			{
				checked:false,
				id:11,
				title:"商品标题111",
				cover:"/static/images/demo/list/1.jpg",
				// 选中商品属性
				attrs:[
					{
						title:"颜色",
						selected:0,
						list: [
							{ name:'火焰红', },
							{ name:'炭黑', },
							{ name:'冰川兰', }
						]
					},
					{
						title:"容量",
						selected:0,
						list: [
							{ name:'64GB', },
							{ name:'128GB', },
						]
					},
					{
						title:"套餐",
						selected:0,
						list: [
							{ name:'标配', },
							{ name:'套餐一', },
							{ name:'套餐二', }
						]
					},
				],
				pprice:336,
				num:1,
				minnum:1,
				maxnum:10, // 该商品最大商品数，跟库存有关
			},
			{
				checked:false,
				id:12,
				title:"商品标题222",
				cover:"/static/images/demo/list/2.jpg",
				// 选中商品属性
				attrs:[
					{
						title:"颜色",
						selected:0,
						list: [
							{ name:'火焰红', },
							{ name:'炭黑', },
							{ name:'冰川兰', }
						]
					},
					{
						title:"容量",
						selected:0,
						list: [
							{ name:'64GB', },
							{ name:'128GB', },
						]
					},
					{
						title:"套餐",
						selected:0,
						list: [
							{ name:'标配', },
							{ name:'套餐一', },
							{ name:'套餐二', }
						]
					},
				],
				pprice:446,
				num:1,
				minnum:1,
				maxnum:10, // 该商品最大商品数，跟库存有关
			},
		],
		// 选中列表(存放选中的id)
		selectedList: [],
		// popup显示
		popupShow: 'none',
		popupIndex: -1,
	},
	getters: {
		// 判断是否全选
		checkedAll: (state)=>{
			return state.list.length === state.selectedList.length;
		},
		// 合计
		totalPrice: (state)=>{
			var total = 0;
			state.list.forEach(v=>{
				if(state.selectedList.indexOf(v.id) > -1){
					total += v.pprice*v.num;
				}
			});
			return total;
		},
		// 禁用全选
		disableSelectAll:(state)=>{
			return state.list.length === 0;
		},
		// 拿到当前需要修改属性的商品
		popupData:(state)=>{
			return state.popupIndex > -1 ? state.list[state.popupIndex] : {};
		},
	},
	mutations: {
		// 全选
		selectAll(state){
			state.selectedList = state.list.map(v=>{
				// 设置选中状态
				v.checked = true;
				return v.id;
			})
		},
		// 取消全选
		unSelectAll(state){
			state.list.forEach(v=>{
				// 设置选中状态
				v.checked = false;
			});
			state.selectedList = [];
		},
		// 选中/取消选中某个商品
		selectItem(state,index){
			let id = state.list[index].id;
			let i = state.selectedList.indexOf(id);
			if (i > -1) {
				state.list[index].checked = false;
				state.selectedList.splice(i,1);
			} else {
				state.list[index].checked = true;
				state.selectedList.push(id);
			}
		},
		// 删除选中
		delGoods(state){
			state.list = state.list.filter(v=>{
				return state.selectedList.indexOf(v.id) === -1;
			});
			state.selectedList = [];
		},
		// 初始化popupIndex
		initPopupIndex(state,index){
			state.popupIndex = index;
		},
		// 加入购物车
		addGoodsToCart(state,goods){
			state.list.unshift(goods);
		}
	},
	actions: {
		doSelectAll({commit,getters}){
			getters.checkedAll ? commit('unSelectAll') : commit('selectAll');
		},
		doDelGoods({commit}){
			uni.showModal({
				content:'是否要删除选中?',
				success: (res)=>{
					if(res.confirm) {
						commit('delGoods');
						uni.showToast({
							title: '删除成功'
						});
					}
				}
			});
		},
		// 显示popup
		doShowPopup({state,commit},index){
			commit('initPopupIndex',index);
			state.popupShow = 'show';
		},
		// 隐藏popup
		doHidePopup({state,commit}){
			state.popupShow = 'hide';
			setTimeout(()=>{
				state.popupShow = 'none';
				commit('initPopupIndex',-1);
			},200);
		},
	}
}