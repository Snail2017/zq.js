# 将工作中比较常用的组件整合成插件。

1. zq.bindKeyEvent() 监听input金额输入，只能输入两位小数.  
使用方法
```
  $(document).ready(function(){
       zq.bindKeyEvent($(".aa"),"正则")；
    });
```
2. zq.tipsbox()   //鼠标移上去显示提示  
使用方法
```
    zq.tipsbox({
         obj: $(".st_tipsbox"),   //选择器
         position: 'right',       //显示位置   上下左右
         width: 'more-line',      //当要换行时  他的宽度。不设置宽度不换行。
         align: 'center'          //字体对齐方式
      })
```
3. zq.addreduce()      数字加减插件  此插件默认限制了只能输入数字 ，可做其他正则限制。    
使用方法
```
zq.addreduce({
    obj: $(".st_addreduce"),    //调用该方法的选择器
    maxnum: 99999,              //可输入最大数
    minnum: 0，                 //可输入最小数
    reg:/^[0-9]\d*/,            //input的框的限制输入格式
})
```
4.  zq.countdown()     倒计时插件    
使用方法
```
zq.countdown({
   time:120,                   //倒计时时间
   tip:获取手机验证码           //结束提示语     
})

```
5. zq.imgUpload()  图片上传插件   支持点击放大  
使用方法
  ```
 zq.imgUpload({                //图片上传插件   支持点击放大
	obj:$(".imgUpload")
})
```
