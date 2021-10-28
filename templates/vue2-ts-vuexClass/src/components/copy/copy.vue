<template>
  <div class="copy-wrap">
    <button class="copy-btn"
            ref="copyBtn"
            @click="goShop($event, 'click')">
      抢购链接
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
// import {  } from "@/components" // 组件
import { Image, List, Loading, Dialog, Toast, Overlay, Lazyload } from 'vant'

import { env, toOpenUrl } from '@/utils/common'
import clipboardJS from 'clipboard'
Vue.use(Dialog)
@Component({})
export default class About extends Vue {
  // prop
  @Prop({
    required: false,
    default: '',
  })
  item_id!: any

  @Action GET_SHOP_DETAIL: any
  clipboard: any = null
  clipboarded: any = false

  // created() {}
  mounted() {
    ;(this as any).$refs.copyBtn.click()
  }
  activated() {
    //
  }

  async goShop(event: any, type: any) {
    if (event.isTrusted) {
      // 用户点击
      if (env() !== 'qq' && env() !== 'wechat') {
        let shopDetail = await this.GET_SHOP_DETAIL({
          item_id: this.item_id,
        })
        console.log('进入非QQ微信')
        window.location.href =
          'tbopen://m.taobao.com/tbopen/index.html?action=ali.open.nav&module=h5&bootImage=0&h5Url=' +
          encodeURIComponent(shopDetail.data.link)
      } else {
        console.log('   进入QQ微信')
        this.clipboard = new clipboardJS(event.target)
      }
    } else {
      //进入页面触发触发
      let shopDetail = await this.GET_SHOP_DETAIL({
        item_id: this.item_id,
      })

      if (env() === 'qq' || (env() === 'wechat' && shopDetail.data.taotoken)) {
        this.copy(shopDetail.data.taotoken, event)
      }
    }
  }
  copy(text: string, event: any) {
    this.clipboard = new clipboardJS(event.target, {
      text: () => text,
    })

    this.clipboard.on('success', (e: any) => {
      Toast({
        message: '已复制淘口令，请淘宝app进行购买！',
        onClose: () => {
          this.clipboarded = false
        },
      })
      this.clipboard && this.clipboard.destroy()
      e.clearSelection()
    })
    this.clipboard.on('error', (e: any) => {
      Toast({
        message: '当前手机暂不支持复制！',
      })
    })
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.copy-wrap {
  width: 100%;
  .copy-btn {
    cursor: pointer;
    background: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid #4a4999;
    padding: 0;
  }
}
</style>

