import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { Dialog, List, Loading, Overlay, Popup, PullRefresh, Sticky, Tab, Tabs, Toast } from 'vant';
import "@/assets/scss/common.scss";
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn';
import 'vant/lib/index.css';
const BrowserLogger = require('alife-logger');
import VConsole from 'vconsole';

if (location.href.indexOf('debug') > -1) {
  new VConsole()
}


dayjs.locale('zh-cn');

Vue.prototype.dayjs = dayjs
Vue.prototype.appEnv = 'dev'

Vue.config.productionTip = false;
Dialog.setDefaultOptions({
  className: 'vant-dialog',
  cancelButtonColor: '#4C5159',
})



declare global {
  interface Window {
    TDAPP: {
      onEvent: any
    },
  }
}

Vue
  .use(Loading)
  .use(Overlay)
  .use(List)
  .use(Popup)
  .use(Dialog)
  .use(Sticky)
  .use(PullRefresh)
  .use(Toast)
  .use(Tab)
  .use(Tabs);

const init = () => {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');
  console.log('init!');
}

const __bl = BrowserLogger.singleton(
  {
    pid: "cgu6f1xhsr@a43054dc562e989",
    appType: "web",
    imgUrl: "https://arms-retcode.aliyuncs.com/r.png?",
    sendResource: true,
    enableLinkTrace: true,
    behavior: true
  }
);
// import('vconsole')
// .then(({default: vConsole}: any) => {
//   const vconsole = new vConsole();
//   init();
// })
init();
