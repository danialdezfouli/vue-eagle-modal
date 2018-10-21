 /* eslint-disable */

import Vue from 'vue'
import App from './components/App.vue'

// import './Plugin';
import {EagleModal} from './Plugin';
Vue.use(EagleModal);

// import List from './components/List';
// Vue.component('List',List);

Vue.use({
    install(Vue, options) {
        Vue.prototype.$prefix = 'vem-';
    }
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
