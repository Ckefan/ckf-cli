<template>
  <div class="shopDetail-wrap">
    <div class="shopDetail">
      <van-skeleton
        class="skeleton-img"
        v-if="!shopDetailInfo.product"
        avatar-shape="square"
        :avatar-size="clientWidth + ''"
        avatar
      />
      <van-skeleton v-if="!shopDetailInfo.product" titile :row="8" />
      <div v-else>
        <van-swipe
          @change="onChange"
          v-if="
            shopDetailInfo &&
            shopDetailInfo.product &&
            shopDetailInfo.product.main_pic
          "
        >
          <van-swipe-item
            v-for="(item, index) in shopDetailInfo.product.main_pic"
            :key="index"
          >
            <van-image width="100%" class="image-item" :src="item" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ shopDetailInfo.product.main_pic.length }}
            </div>
          </template>
        </van-swipe>
        <div class="shop-base">
          <div class="shop-price">
            <span class="shop-tag">到手价</span>
            <span class="current">{{ shopDetailInfo.price }}</span>
            <span class="original">原价¥{{ shopDetailInfo.origin_price }}</span>
            <span class="sold-out"
              >已售{{ shopDetailInfo.month_sale_count }}件</span
            >
          </div>
          <div class="title">
            <span style="color: #ff4855">{{
              shopDetailInfo.special_content
            }}</span>
            {{ shopDetailInfo.title }}
          </div>
          <div
            class="coupon clickable"
            v-show="shopDetailInfo.coupon_amount > 0"
          >
            <div class="coupon-info">
              <div class="num">{{ shopDetailInfo.coupon_amount }}优惠券</div>
              <div class="date">
                使用期限：{{ shopDetailInfo.coupon_start_time }}-{{
                  shopDetailInfo.coupon_end_time
                }}
              </div>
            </div>
            <div
              class="will-use"
              @click="go(shopDetailInfo.link, shopDetailInfo.title, 'hand')"
            >
              立即领券
            </div>
          </div>

          <div class="shop-subtitle">{{ shopDetailInfo.desc_message }}</div>
        </div>

        <div class="evaluate" v-if="shopDetailInfo.comment > 0">
          <van-cell
            :border="false"
            :title="'评价' + convert(shopDetailInfo.comment) + '+'"
          />
          <div class="tag-wrapper">
            <div
              class="tag"
              v-for="(item, index) in shopDetailInfo.comment.tag_shopDetailInfo"
              :key="index"
            >
              {{ item.tag + '(' + item.comment_count + ')' }}
            </div>
          </div>
          <div class="userlist" v-if="shopDetailInfo.comment.one_comment">
            <div class="list">
              <div class="title">
                {{ shopDetailInfo.comment.one_comment.username }}
              </div>
              <div class="content">
                {{ shopDetailInfo.comment.one_comment.content }}
              </div>
            </div>
          </div>
        </div>
        <div class="store">
          <van-image
            class="store-img"
            :src="shopDetailInfo.product.white_image"
          />
          <div class="store-info">
            <div class="store-title">
              {{ shopDetailInfo.product.shop_name }}
            </div>
            <div class="store-desc">
              <span class="text super"
                >宝贝描述:{{ shopDetailInfo.product.desc_score }}</span
              >
              <span class="text super"
                >卖家服务:{{ shopDetailInfo.product.ship_score }}</span
              >
              <span class="text super"
                >物流服务:{{ shopDetailInfo.product.service_score }}</span
              >
            </div>
          </div>
        </div>
        <div class="store-detail" v-if="shopDetailInfo.product.detail_pics">
          <div class="store-detail-title">图文详情</div>
          <div>
            <van-image
              class="detail-img"
              width="100%"
              v-for="(item, index) in shopDetailInfo.product.detail_pics"
              :key="index"
              :src="item"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <van-goods-action>
        <van-goods-action-button
          type="warning"
          class="share-box"
          @click="share"
        >
          <div class="share">
            <van-image class="shareImg" :src="shareImg" fit="contain" />
            <div class="text clickable">转发</div>
          </div>
        </van-goods-action-button>
        <van-goods-action-button
          type="danger"
          @click="go(shopDetailInfo.link, shopDetailInfo.title)"
          :text="
            '到手价¥' + (shopDetailInfo.price ? shopDetailInfo.price : '-')
          "
        />
      </van-goods-action>
    </div>
    <share-model :showShare="showShare" :hideShare="hideShare" />
  </div>
</template>

<script lang="ts" src="./shopDetail.ts"></script>

<style lang="scss">
@import './shopDetail.scss';
</style>

