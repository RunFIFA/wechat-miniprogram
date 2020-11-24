import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';


Page({
  data: {
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0


  },

  Cates: [],

  onLoad: function (options) {


    const Cates = wx.getStorageSync('cates');
    if (!Cates || (Date.now() - Cates.time > 1000 * 10)) {
      this.getCates();

    } else {
      this.Cates = Cates.data;
      let leftMenuList = this.Cates.map(v => v.cat_name);
      let rightContent = this.Cates[0].children;
      this.setData({
        rightContent,
        leftMenuList
      })

    }

  },

  async getCates() {

    // request({
    //   url: '/categories'
    // })
    //   .then(res => {
    //     this.Cates = res.data.message;
    //     wx.setStorageSync("cates",{time:Date.now(),data:this.Cates});
    //     let leftMenuList = this.Cates.map(v => v.cat_name);
    //     let rightContent = this.Cates[0].children;
    //     this.setData({
    //       rightContent,
    //       leftMenuList
    //     })
    //   })
    const res = await request({ url: "/categories" })
    this.Cates = res;
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    let leftMenuList = this.Cates.map(v => v.cat_name);
    let rightContent = this.Cates[0].children;
    this.setData({
      rightContent,
      leftMenuList
    })
  },

  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      scrollTop: 0,
      rightContent
    })
  }
})