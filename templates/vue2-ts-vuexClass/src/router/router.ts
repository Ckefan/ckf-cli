/**
 * meta 可配置参数
 * @param {boolean} icon 页面icon
 * @param {boolean} keepAlive 是否缓存页面
 * @param {string} title 页面标题
 */
export default [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/shopDetail',
    name: 'shopDetail',
    component: () => import('@/views/shopDetail/shopDetail.vue'),
    meta: {
      icon: '',
      keepAlive: false,
      title: '商品详情页'
    }
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('@/views/index/index.vue'),
    meta: {
      icon: '',
      keepAlive: true,
      title: 'index'
    }
  },
]