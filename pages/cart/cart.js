import { getSetting, chooseAddress, openSetting, showModal, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({

  data: {
    cart: [],
    address: {},
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  onShow() {

    const address = wx.getStorageSync('address')
    const cart = wx.getStorageSync('cart') || []

    this.setData({ address })
    this.setCart(cart)
  },

  async handleChooseAddress() {
    try {
      // 1 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 2 判断 权限状态
      if (scopeAddress === false) {
        await openSetting();
      }
      // 4 调用获取收货地址的 api
      let address = await chooseAddress();
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;
      console.log(address)
      // 5 存入到缓存中
      wx.setStorageSync("address", address);

    } catch (error) {
      console.log(error);
    }
  },

  handeItemChange(e) {
    const goods_id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v => v.goods_id === goods_id);
    cart[index].checked = !cart[index].checked

    this.setCart(cart);
  },

  setCart(cart){
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;

    cart.forEach(v => {
      if(v.checked){
      totalPrice += v.num * v.goods_price;
      totalNum += v.num;
    }
      else{
        allChecked = false;
      }
    });

    this.setData({
      cart,
      totalNum,totalPrice,allChecked
    });
    wx.setStorageSync('cart', cart)
  },

  handleItemAllCheck(){
    let {cart,allChecked} = this.data;
    allChecked = !allChecked
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },

  async handleItemNumEdit(e){
    const { operation , id } = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v => v.goods_id === id );
    if(cart[index].num === 1 && operation === -1){
      const res = await showModal({content: "您是否要删除？" })
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart)
      }
    }else{
      cart[index].num += operation
      this.setCart(cart)
    }
  },

  async handlePay(){

    const {address,totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    if(totalNum === 0){
      await showToast({title:"您还没有选购商品"});
      return;
    }
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
})