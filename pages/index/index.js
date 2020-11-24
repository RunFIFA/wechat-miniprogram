import { request } from "../../request/index.js";

Page({
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function (options) {

    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },



  getSwiperList() {
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
      
  },
  getNavList() {
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          navList: result
        })
      })
  },
  getFloorList() {
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
});
