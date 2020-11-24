import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({


  data: {
    goods: [],
    isFocus: false,
    inpValue: ""

  },
  timeId: -1,
  handleInput(e) {
    const { value } =e.detail;
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);

    this.TimeId=setTimeout(()=>{
      this.qsearch(value);
    },1000);
  },

  async qsearch(query){
    const res=await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },
  handleCancel(){
    this.setData({
      inpValue:"",
      isFocus:false,
      goods:[]
    })
  }
})