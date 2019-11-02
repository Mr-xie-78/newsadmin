// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import ElementUI from 'element-ui';
// 引入 css
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

// 引入 ui 库
//注册组件库
Vue.use(ElementUI);

// 绑定到原型
Vue.prototype.$axios = axios;
//设置默认的 api 域名
axios.defaults.baseURL = "http://111.230.181.206:3000"

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
