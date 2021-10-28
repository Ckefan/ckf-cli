<template>
  <div id="app">
    <transition :name="viewTransition" :css="!!direction">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive>
    </transition>

    <transition :name="viewTransition" :css="!!direction">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import urls from '@/config/requestConfig'
import { getParams, setLocalStorage } from '@/utils/common'
@Component
export default class App extends Vue {
  // @Action
  @Getter direction: string | undefined

  // 调试代码
  mounted() {
    const urlObj = getParams(window.location.search)
    setLocalStorage('urlObj', JSON.stringify(urlObj))
  }

  get viewTransition() {
    if (!this.direction) {
      return ''
    }
    return `router-transition-${this.direction === 'forward' ? 'in' : 'out'}`
  }
}
</script>

<style lang="scss">
// iOS 列表滑动
//
* {
  -webkit-overflow-scrolling: touch;
  user-select: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  word-wrap: break-word;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: 500;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.clickable {
  user-select: none;

  &:active {
    opacity: 0.7;
  }
}

/* 清除浮动 */
.clearfloat:after {
  display: block;
  clear: both;
  content: '';
  visibility: hidden;
  height: 0;
}

.clearfloat {
  zoom: 1;
}

.van-list__error-text,
.van-list__finished-text,
.van-list__loading {
  font-size: 12px;
}

[v-cloak] {
  display: none;
}

.router-transition-out-enter-active,
.router-transition-out-leave-active,
.router-transition-in-enter-active,
.router-transition-in-leave-active {
  will-change: transform, opacity;
  transition: all 250ms;
  height: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.router-transition-out-enter {
  opacity: 0;
  transform: translate3d(-60%, 0, 0);
}

.router-transition-out-leave-active {
  opacity: 0;
  transform: translate3d(60%, 0, 0);
}

.router-transition-in-enter {
  opacity: 0;
  transform: translate3d(60%, 0, 0);
}

.router-transition-in-leave-active {
  opacity: 0;
  transform: translate3d(-60%, 0, 0);
}

.van-sticky {
  background-color: white;
}

//  适配iPhoneX XS安全区域
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .iphone {
    margin-bottom: 29px;
  }
}

/* xr */
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) {
  .iphone {
    margin-bottom: 29px;
  }
}

/* xs max */
@media only screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) {
  .iphone {
    margin-bottom: 32px;
  }
}

/* 骨架屏闪烁动画 */
.skeleton-animate {
  -webkit-animation: skeleton-blink 1.2s ease-in-out infinite;
  animation: skeleton-blink 1.2s ease-in-out infinite;
}

@keyframes skeleton-blink {
  50% {
    opacity: 0.6;
  }
}
</style>
