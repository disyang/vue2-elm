import state from './state';
import actions from './action';
import mutations from './mutation';
import getters from './getter';

import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
});