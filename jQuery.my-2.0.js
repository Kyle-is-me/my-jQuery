/**
 * 封装一个简易的jQuery
 * 1.基础选择器
 * 2.css样式
 * 3.操作元素
 * 
 * 
 */

// 形成一个局部作用域，防治污染
;(function(){

  // $(css选择器)-第一部 获取元素
  function jQuery(selector){
    return new God(selector);//返回一个实例对象
  }

  // 把所有的方法都存到原型对象中去，需要先创建一个构造函数
  function God(selector){
    let list = document.querySelectorAll(selector);//得到的是NodeList的实例对象，是一个伪数组
    // 遍历伪数组，把每一个元素添加到我需要的实例对象中去
    for (let i = 0 ; i < list.length; i++){
      this[i] = list[i];//这里的this指向的是实例对象
    }
    // 伪数组还需要一个长度
    this.length = list.length;
  }

  // jq当中很多方法都需要用到遍历，这里先封装一个
  God.prototype.each = function(callback){
    for(let i = 0 ; i < this.length;i ++){
      callback(i,this[i]);
    }
  }

  /**
   * css属性
   * 1.获取属性
   *  
   * 2.设置属性
   * 
   */
  God.prototype.css = function(property,value){
    // 判断第二个值value是否为空，空的代表要获取属性
    if(value == undefined) {
      return window.getComputedStyle(this[0])[property];
    }else{
      // 有一个数组，储存了需要带单位的属性
      let pxArr = ['height','width','top','left'];
      // 循环遍历，区分出需要带单位和不带单位的属性
      // $('li').css('width','100px')

      this.each((i,e)=>{
        if(pxArr.indexOf(property) !== -1 ){
          // 判断出是否传入了带px的值
          if(value.toString().indexOf('px') === -1 ){
            e.style[property] = value + 'px';
          }else{
            e.style[property] = value;
          }
        }else{
          e.style[property] = value;          
        }
      })

    }
    return this;
  }

  /**
   * 操作属性
   * 1.addClass
   * 添加类名
   */
  God.prototype.addClass = function(className){
    this.each((i,e)=>{
      e.classList.add(className)
    })
    return this;
  }

  /**
   * removeClass
   * 移除类名
   */
  God.prototype.removeClass = function(className){
    this.each((i,e)=>{
      e.classList.remove(className)
    });
    return this;
  };

  /**
   * toggleClass
   * 切换类名
   */
  God.prototype.toggleClass = function(className){
    this.each((i,e)=>{
      e.classList.toggle(className);
    })
  };

  window.$ = window.jQuery = jQuery;
})();


let box = $('.box');
// box.css('height',200);
// box.css('width','300px');
// box.css('backgroundColor','pink');
// console.log(box.css('width'));
// console.log(box.css('height'));
// console.log(box.css('backgroundColor'));
// box.toggleClass('a');
box.addClass('a');
// box.removeClass('a')
