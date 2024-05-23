import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper';

import App from './App.vue'
import router from './router'

import './assets/main.css'
import 'virtual:uno.css'
import '@unocss/reset/normalize.css'
let app: any

const usePlugin = () => {
  app = createApp(App)
  app.use(createPinia())
  app.use(ElementPlus, {  })
  app.use(router)

  app.config.errorHandler = (err: any, instance: any, info: any) => {
    // 处理错误，例如：报告给一个服务
    console.log({ err, instance, info })
    console.error(err)
  }
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  usePlugin()
  app.mount('#app')
} else {
  renderWithQiankun({
    mount(props) {
      console.log('--mount');
      props?.setLoading(false)
      usePlugin()
      app.config.globalProperties.$qiankun = props
      app.mount(
          (props.container
            ? props.container.querySelector('#app')
            : document.getElementById('app')) as Element
        );
    },
    bootstrap() {
      console.log('--bootstrap');
    },
    update() {
      console.log('--update');
    },
    unmount() {
      console.log('--unmount');
      app?.unmount();
    }
  });

}

