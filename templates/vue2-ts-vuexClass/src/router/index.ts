import Vue from 'vue'
import Router from 'vue-router'
import routes from './router'
import store from '@/store/index'

Vue.use(Router)

const router: any = new Router({
  routes,
  mode: 'history',
})
const history: any = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/index', 0) // 默认首页
let isTouchStart = false
let endTime = Date.now()
let isPush = false
let methods = ['push', 'go', 'replace', 'forward', 'back']

methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = (...args: any) => {
    isPush = true
    method.apply(null, args)
  }
})

document.addEventListener('touchend', () => {
  isTouchStart = false
  endTime = Date.now()
})
document.addEventListener('touchstart', () => {
  isTouchStart = true
})

// 跳转之前
router.beforeEach((to: any, from: any, next: any) => {
  const path = window.location.href
  let title = 'QQ用户订单绑定与积分兑换'
  // if (to.path.indexOf('/flashsale') > -1) {
  //   title = '秒杀'
  // }
  // if (to.path.indexOf('/calendar') > -1) {
  //   title = '双12日历'
  // }
  // if (to.path.indexOf('/buglist') > -1) {
  //   title = '漏洞清单'
  // }
  // if (to.path.indexOf('/shopDetail') > -1 || to.path.indexOf('/listShopDetail') > -1) {
  //   title = '商品详情'
  // }

  document.title = title

  // 过渡动画
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  let direction = ''
  let scrollPosition = 0

  if (from.name && to.name) {
    if (toIndex) {
      if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
        direction = 'forward'
      } else {
        direction = 'reverse'
        history.removeItem(from.path)
        --historyCount
        history.setItem('count', historyCount)
      }
    } else {
      ++historyCount
      history.setItem('count', historyCount)
      if (from.name) {
        history.setItem(to.path, historyCount)
      }
      direction = 'forward'
    }
  } else {
    // 第一次进入及外部跳转无需动画过渡
    direction = ''
  }

  // 判断是否是ios左滑返回 或者 右滑前进
  if (!isPush && (((Date.now() - endTime) < 377) || isTouchStart)) {
    store.commit('updateDirection', { direction: '' })
  } else {
    store.commit('updateDirection', { direction })
  }
  isTouchStart = false

  const container = document.querySelector('#app>div')
  if (container) {
    scrollPosition = container.scrollTop
  }
  if (direction !== 'reverse') {
    from.meta.scrollPosition = scrollPosition
  }
  to.meta.direction = direction

  setTimeout(() => {
    next()
  })
})

// 跳转之后
router.afterEach((to: any, from: any) => {
  isPush = false
  setTimeout(() => {
    if (to.meta.direction === 'reverse') {
      const container = from.meta.keepAlive ?
        document.querySelectorAll('#app>div')[1] :
        document.querySelector('#app>div')
      if (container) {
        container.scrollTo(0, to.meta.scrollPosition)
      }
    }
  })
})

export default router
