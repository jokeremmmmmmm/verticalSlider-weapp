// components/verticalSlider/verticalSlider.js
var startPosition = 0;
var bottomPosition = 0;
var min = 0;
var max = 0;
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    cancelClick:{
      type:Boolean,
      value:false
    },
    sliderWidth: {
      type: String,
      value: "100%"
    },
    grooveRadius: {
      type: String,
      value: "none"
    },
    grooveColor: {
      type: String,
      value: "white"
    },
    currentColor: {
      type: String,
      value: "#e8e8f6"
    },
    buttonWidth: {
      type: Number,
      value: 20
    },
    buttonHeight: {
      type: Number,
      value: 20
    },
    step: {
      type: Number,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    buttonPosition: 0,
    buttonPositionTmp: 0,
    currentProgress: 0
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行

      this.getInitedPosition();
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getInitedPosition() {
      var query = wx.createSelectorQuery().in(this);
      var that = this;
      //选择id
      query.select('#verticalSliderContainer').boundingClientRect();
      query.exec(function (res) {
        if(!that.properties.cancelClick){
          bottomPosition={clientX:res[0].left,clientY:res[0].top+res[0].height};
        }
        max = res[0].height;
      })
    },
    buttonMove(e) {
      var t = this.data.buttonPositionTmp;
      var endPoint = e.touches[e.touches.length - 1];
      var translateY = startPosition.clientY - endPoint.clientY;
      var p = Number(t) + Number(translateY);
      if (p <= max && p >= min) {
        this.setData({
          buttonPosition: p,
          currentProgress: p
        });
      } else if (p > max) {
        this.setData({
          buttonPosition: max,
          currentProgress: max
        });
      } else if (p < min) {
        this.setData({
          buttonPosition: min,
          currentProgress: min
        });
      }
      var moveEventDetail = {} // detail对象，提供给事件监听函数
      var moveEventOption = {} // 触发事件的选项
      this.triggerEvent('moveEvent', moveEventDetail, moveEventOption)
    },
    buttonStart(e) {
      startPosition = e.touches[0];
      this.setData({
        buttonPositionTmp: this.data.buttonPosition
      });
      var startEventDetail = {value: this.getCurrentValue()} // detail对象，提供给事件监听函数
      var startEventOption = {} // 触发事件的选项
      this.triggerEvent('startEvent', startEventDetail, startEventOption)
    },
    buttonEnd(e) {
      startPosition = e.touches[0];
      this.afterButtonEnd();
      var endEventDetail = {
        value: this.getCurrentValue()
      } // detail对象，提供给事件监听函数
      var endEventOption = {} // 触发事件的选项
      this.triggerEvent('endEvent', endEventDetail, endEventOption)
    },
    sliderClick(e){
      this.setData({
        buttonPositionTmp: this.data.buttonPosition
      });
      if(this.properties.cancelClick){
        return
      }
      var endPoint = e.touches[e.touches.length - 1]
      var t = this.data.buttonPositionTmp;
      var p = bottomPosition.clientY - endPoint.clientY;
      // var p = Number(t) + Number(translateY);
      if (p <= max && p >= min) {
        this.setData({
          buttonPosition: p,
          currentProgress: p
        });
      } else if (p > max) {
        this.setData({
          buttonPosition: max,
          currentProgress: max
        });
      } else if (p < min) {
        this.setData({
          buttonPosition: min,
          currentProgress: min
        });
      }
      this.afterButtonEnd();
      var clickEventDetail = {
        value: this.getCurrentValue()
      } // detail对象，提供给事件监听函数
      var clickEventOption = {} // 触发事件的选项
      this.triggerEvent('clickEvent', clickEventDetail, clickEventOption)
    },
    afterButtonEnd() {
      let s = Number(this.properties.step);
      let t = Number(this.data.currentProgress);
      let e = ((s/100)*max).toFixed(1);
      if (s == 0) {
        return
      } else {
        this.setData({
          buttonPosition: Math.round(t/e)*e,
          currentProgress: Math.round(t/e)*e
        });
      }
    },
    getCurrentValue() {
      return Math.round((this.data.currentProgress / max).toFixed(2) * 100);
    },
    setCurrentValue(val){
      // console.log("改变：",val)
      this.setData({
        buttonPosition: (val/100)*max,
        currentProgress: (val/100)*max
      });
    }
  }
})