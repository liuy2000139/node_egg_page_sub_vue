import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {
  renderWithQiankun,
  qiankunWindow
} from 'vite-plugin-qiankun/dist/helper';

import App from './App.vue'
import router from './router'

import './assets/main.css'

let app: any

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  app = createApp(App)
  app.use(createPinia())
  app.use(router)
  app.mount('#app')
} else {
  renderWithQiankun({
    mount(props) {
      console.log('--mount');
      props?.setLoading(false)
      app = createApp(App);
      app.config.globalProperties.$qiankun = props
      app
        .use(router)
        .use(createPinia())
        .mount(
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

