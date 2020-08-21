import Vue from 'vue';
import Vuex from 'vuex';

import cart from '@/store/modules/cart.js';
import path from '@/store/modules/path.js';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		cart,
		path,
	}
});