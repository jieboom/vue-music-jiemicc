<template>
  <div class="scroll-wrapper" ref="scrollRef">
    <slot></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { useScroll } from './useScroll'
export default defineComponent({
  name: 'Scroll',
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  emits: ['scroll'],
  setup (props, context) {
    const { emit } = context
    const { scrollRef, scroller } = useScroll(props.click, props.probeType, emit)
    return {
      scrollRef,
      scroller
    }
  }
})
</script>
<style lang="less" scoped>
.scroll-wrapper{
    height: 100%;
}
</style>
