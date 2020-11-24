import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    goodsObj: {},
    isCollect:false
  },
  GoodsInfo:{},
  


  onLoad: function (options) {

    const { goods_id } = options
    this.getGoodsDetail(goods_id)

  },

  async getGoodsDetail(goods_id) {
    const goodsObj = await request({ url: "/goods/detail", data: { goods_id } })
    this.GoodsInfo = goodsObj

    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    if(index!=-1){
      isCollect=true;
    }
    else{
      isCollect=false;
    }

    this.setData({
      isCollect,
      goodsObj: {
        goods_id: goodsObj.goods_id,
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        pics: goodsObj.pics,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg')
      }
    })
  },

  handlePrevewImage(e) {
    const goodsObj = goodsObj
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid);
    const index = e.currentTarget.dataset.index
    wx.previewImage({
      current: urls[index],
      urls: urls
    })
  },

  handleCollect() {
    let isCollect = false;
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);

    if(index!=-1){
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消收藏',
        icon:'success',
        mask:false
      })
    }
    else{
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon:'success',
        mask:false
      })
    }

    wx.setStorageSync('collect',collect);
    this.setData({
      isCollect
    })
  },

  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);

    if (index === -1) {
      this.GoodsInfo.num = 1
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }
    else{
      cart[index].num++;
    }

    wx:wx.setStorageSync('cart', cart);
    wx:wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }

})