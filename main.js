import Vue from 'vue';
import App from './App';
import store from './store';

Vue.prototype.$store = store;
Vue.config.productionTip = false;

// 引入全局组件
import divider from '@/components/common/divider.vue'
Vue.component('divider',divider)

// 引入全局加载动画
import loading from '@/components/common/loading.vue'
Vue.component('loading',loading);

import loadingPlus from '@/common/mixin/loading-plus.vue'
Vue.component('loading-plus',loadingPlus);

App.mpType = 'app';

const app = new Vue({
	store,
    ...App
})
app.$mount()
