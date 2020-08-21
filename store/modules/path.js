export default {
	state: {
		list: [
			{
				name: '张三',
				phone: '159****0993',
				path: '广东省 广州市 白云区',
				detailPath: 'XXX街道',
				isdefault: true,
			},
			{
				name: '李四',
				phone: '139****2153',
				path: '福建省 福州市 马尾区',
				detailPath: 'YYY街道',
				isdefault: false,
			},
		],
	},
	getters: {
		// 获取默认地址
		defaultPath: (state)=>{
			return state.list.filter(v=>v.isdefault);
		}
	},
	mutations: {
		// 创建收获地址
		createPath(state,item) {
			state.list.unshift(item)
		},
		// 删除收获地址
		delPath(state,index) {
			state.list.splice(index,1);
		},
		// 修改收获地址
		updatePath(state,{index,item}) {
			for(let key in item) {
				state.list[index][key] = item[key];
			}
		},
		// 取消默认地址
		removeDefault(state) {
			state.list.forEach((v)=>{
				if (v.isdefault) {
					v.isdefault = false;
				}
			});
		}
	},
	actions: {
		// 修改地址
		updatePathAction({commit},obj) {
			if (obj.item.isdefault) {
				commit('removeDefault');
			}
			commit('updatePath',obj);
		},
		// 添加地址
		createPathAction({commit},item) {
			if (item.isdefault) {
				commit('removeDefault');
			}
			commit('createPath',item);
		}
	}
}