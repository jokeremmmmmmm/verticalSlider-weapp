自写的简易垂直滑动条（微信小程序）



### 属性

| 属性名       | 类型    | 默认值   | 属性说明               |
| ------------ | ------- | -------- | ---------------------- |
| cancelClick  | Boolean | false    | 是否取消点击选择事件   |
| currentColor | String  | \#e8e8f6 | 当前进度的拖动条背景色 |
| buttonWidth  | Number  | 20（px） | 默认拖动按钮的宽度     |
| buttonHeight | Number  | 20（px） | 默认拖动按钮的高度     |
| step         | Number  | 1        | 步长（最大值为100）    |



### 事件

| 事件名     | 返回值         | 事件说明                                    |
| ---------- | -------------- | ------------------------------------------- |
| clickEvent | e.detail.value | 点击slider的事件，返回值为当前值            |
| startEvent | e.detail.value | 开始拖动slider button的事件，返回值为当前值 |
| moveEvent  | e.detail.value | 拖动slider button的事件，返回值为当前值     |
| endEvent   | e.detail.value | 结束拖动slider button的事件，返回值为当前值 |



### 用法

在引入本组件二点页面路径下的json文件中：

```json
{
  "usingComponents": {
    "verticalSlider":"path/verticalSlider/verticalSlider"
  }
}
```

页面wxml文件中：

```html

<verticalSlider id="strenghSlider" step="{{10}}" buttonWidth="{{38}}" buttonHeight="{{56}}" cancelClick="{{true}}" bind:startEvent="start" bind:endEvent="end"> 
  <image slot="sliderButton" src="../../imgs/sliderButton.jpg"></image>
</verticalSlider>
```

