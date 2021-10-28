// shopDetail.Data 参数类型
export interface ShopDetailData {
  pageName: string
}

// VUEX shopDetail.State 参数类型
export interface ShopDetailState {
  shopDetail: {
    author: any
  }
  [key: string]: any,
  data?: any
}

// GET_DATA_ASYN 接口参数类型
// export interface DataOptions {}

