import { createApp } from 'vue'
import router from './routes'
import App from './App.vue'

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from "@highlightjs/vue-plugin";

hljs.registerLanguage('javascript', javascript);

createApp(App)
.use(hljsVuePlugin)
.use(router)
.mount('#app')
