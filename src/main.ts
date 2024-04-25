import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import "element-plus/theme-chalk/src/index.scss"

import App from './App.vue'



import Cron from '../packages'

const app = createApp(App)


import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}


app.use(ElementPlus)
    .use(Cron)
    .mount('#app')



