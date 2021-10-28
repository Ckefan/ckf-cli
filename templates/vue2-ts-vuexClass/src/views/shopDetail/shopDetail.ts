import { Component, Vue } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import {
  Skeleton,
  Image,
  Swipe,
  SwipeItem,
  Dialog,
  Toast,
  GoodsAction,
  GoodsActionButton,
} from 'vant';
Vue.use(Skeleton)
  .use(Skeleton)
  .use(Image)
  .use(Swipe)
  .use(SwipeItem)
  .use(Dialog)
  .use(Toast)
  .use(GoodsAction)
  .use(GoodsActionButton);
import clipboardJS from 'clipboard';
import { env, toOpenUrl } from '@/utils/common';

@Component({
  components: {},
})
export default class About extends Vue {
  current: number = 0;
  showShare: boolean = false;
  mypacketIndex = '';
  mypacketShow = false;
  hint = false;
  loadin = false;
  clientWidth = window.innerWidth;
  noIntegral = false;
  popupConversion = false;
  clipboard: any = null;
  shopUrl = ''; // 直接购买url
  convertUrl = ''; // 兑换商品url
  taotoken = ''; // 直接购买token
  convertTaotoken = ''; // 兑换商品token
  Loading = {
    buy: false,
    conversion: false,
    convert: false,
    save: false,
  };

  @Getter shopDetailInfo: any;
  @Action GET_SHOP_DETAIL: any;
  @Action UPDATE_INDEX_STATE_ASYNC: any;

  mounted() {
    this.GET_SHOP_DETAIL({
      item_id: this.$route.query.item_id,
    });
  }
  destroyed() {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
    this.clipboard = null;
    this.UPDATE_INDEX_STATE_ASYNC({
      shopDetailInfo: '',
    });
  }

  onChange(index: number) {
    this.current = index;
  }
  hideShare() {
    this.showShare = false;
  }
  copy(text: string) {
    this.clipboard = new clipboardJS('body', {
      text: () => {
        return text;
      },
    });
    this.clipboard.on('success', (e: any) => {
      Toast({
        message: '已复制淘口令，请淘宝app进行购买！',
      });
      e.clearSelection();
      if (this.clipboard) {
        this.clipboard.destroy();
      }
      this.clipboard = null;
    });
    this.clipboard.on('error', (e: any) => {
      Toast({
        message: '当前手机暂不支持复制！',
      });
    });
  }
  go(url: string, title: string) {
    (window as any).TDAPP.onEvent(
      `tablist_Click_${title}`,
      `tab列表_点击${title}`
    );
    (window as any).TDAPP.onEvent(
      `Listproductpage_Click_Price`,
      `列表商品详情页__点击到手价`
    );
    console.log(123);
    if (
      env() === 'qq' ||
      (env() === 'wechat' && this.shopDetailInfo.taotoken)
    ) {
      this.copy(this.shopDetailInfo.taotoken);
    }
    if (env() !== 'qq' && env() !== 'wechat') {
      window.location.href = toOpenUrl(encodeURIComponent(url));
    }
  }
  share() {
    this.showShare = true;
    (window as any).TDAPP.onEvent(
      `Listproductpage_Click_share`,
      `列表商品详情页__点击分享`
    );
  }
}
