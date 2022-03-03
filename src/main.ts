import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import '@/assets/less/index.less'
import { loadingDirective } from './utils/directives'
import lazyPlugin from 'vue3-lazy'
createApp(App).use(store).use(router).use(lazyPlugin, {
  loading: require('@/assets/images/default.png')
}).directive('loading', loadingDirective).mount('#app')
