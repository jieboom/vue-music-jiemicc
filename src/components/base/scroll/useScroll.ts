import BScroll from '@better-scroll/core'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import ObserveDOM from '@better-scroll/observe-dom'
import { Ref, ref, onMounted, onUnmounted } from 'vue'
BScroll.use(ObserveDOM)
export const useScroll = (click: boolean, probeType:number, emit:(event: 'scroll', ...args: unknown[]) => void): {
    scrollRef: Ref<HTMLDivElement | undefined>;
    scroller:Ref<BScrollConstructor| undefined>
} => {
  const scrollRef = ref<HTMLDivElement>()
  const scroller = ref<BScrollConstructor>()
  onMounted(() => {
    scroller.value = new BScroll((scrollRef as Ref<HTMLDivElement>).value, {
      click,
      observeDOM: true,
      probeType
    })
    if (probeType > 0) {
      scroller.value.on('scroll', (pos:number) => {
        emit('scroll', pos)
      })
    }
  })
  onUnmounted(() => {
    (scroller.value as BScrollConstructor).destroy()
  })

  return {
    scrollRef,
    scroller
  }
}
