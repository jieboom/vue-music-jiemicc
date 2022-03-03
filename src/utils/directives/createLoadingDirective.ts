// 加载loading指令   实现接口数据渲染之前的加载动画
// TODO:  1. 指令插入时插入loading 元素
//          loading dom元素以组件方式提供
//          需要提供变量(指令value) 控制loading的显隐
//          提供自定义加载文案(arg参数)
//        2. 接口数据渲染成功之后,移除loading元素
//        3. loading布局的position需要依赖于父元素的position定位

import { DirectiveBinding, Component, Directive, createApp, ComponentPublicInstance } from 'vue'
import { addClass } from '../dom'
const relativeClass = 'g-relative'
const absoluteParentPosiValidList = ['relative', 'absolute', 'fixed']
// 仅提供loading指令创建, 可自定义传入的loading组件
export default (loadingCompoent:Component): Directive => {
  let loadingCom :ComponentPublicInstance<unknown, unknown, {title?:string}>
  return {
    mounted (el:HTMLDivElement, binding: DirectiveBinding) {
      loadingCom = createApp(loadingCompoent).mount(document.createElement('div'))
      if (typeof binding.arg === 'string' && binding.arg && loadingCom.$data.title) {
        loadingCom.$data.title = binding.arg
      }
      if (binding.value) appendChild(el, loadingCom.$el)
    },
    updated (el:HTMLDivElement, binding: DirectiveBinding) {
      if (binding.value !== binding.oldValue) {
        binding.value ? appendChild(el, loadingCom.$el) : el.removeChild(loadingCom.$el)
      }
    }
  }
}
const appendChild = (el:HTMLDivElement, loadingEl:HTMLElement):void => {
  const positionStyle = getComputedStyle(el).position
  if (!absoluteParentPosiValidList.includes(positionStyle)) {
    addClass(el, relativeClass)
  }
  el.appendChild(loadingEl)
}
