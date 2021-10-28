<template>
  <div class="index-wrap">
    <myHeader/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { Getter, Action } from "vuex-class"
import { IndexData } from '@/types/views/index.interface'
import {
myHeader 
} from "@/components" // 组件


@Component({
  components: {
   myHeader
  }
})
export default class About extends Vue {
  data: IndexData = {
    pageName: 'index',
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/variables.scss';
.index-wrap {
  width: 100%;
  background: linear-gradient(180deg, #fd401e 0%, rgba(253, 64, 30, 0) 38%, rgba(255, 255, 255, 255) 100%);
  .index-title {
    font-size: 34px;
    font-weight: 500;
    margin: 28px 0 28px 0;
    color: #fff;
    letter-spacing: 1px;
  }
  .merge{
    display: flex;
    justify-content: space-between;
    .interval{
      width: 8px;
      background: #F4F4F4;
    }
  }
}

</style>

