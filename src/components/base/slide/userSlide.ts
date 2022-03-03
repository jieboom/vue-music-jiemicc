/* eslint-disable no-unused-expressions */
import BScroll from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import Slide from '@better-scroll/slide'
import { ref, onMounted, Ref, onUnmounted, onActivated, onDeactivated } from 'vue'
BScroll.use(Slide)
// userSider的作用在于 新建一个betterScroll instance 并且 维护轮播图当前激活状态
export const userSlider = (): {
    currentScrollIndex: Ref<number>,
    sliderRef: Ref<HTMLDivElement> | Ref<undefined>
} => {
  const sliderRef = ref<HTMLDivElement>() // dom元素引用类型定义如何初始化
  const currentScrollIndex = ref(0)
  const slider = ref<BScrollConstructor>()
  onMounted(() => {
    slider.value = new BScroll((sliderRef as Ref<HTMLDivElement>)?.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true
    })
    slider.value.on('slidePageChanged', (page: Record<string, number>) => {
      currentScrollIndex.value = page.pageX
    })
  })
  onUnmounted(() => {
        slider.value?.destroy()
  })
  onActivated(() => {
        slider.value?.enable()
        slider.value?.refresh()
  })

  onDeactivated(() => {
        slider.value?.disable()
  })
  return {
    currentScrollIndex,
    sliderRef
  }
}
