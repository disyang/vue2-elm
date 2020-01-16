import Vue from 'vue';
import App from './App.vue';
import { store } from './store';
import { router } from './router';
import { i18n } from './i18n';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.use(ElementUI, {
  i18n: (key: string, value: string) => i18n.t(key, value)
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
