<template>
  <div class="slider" ref="sliderRef">
    <div class="slider-group">
      <div
        class="slider-page"
        v-for="item in sliders"
        :key="item.id"
      >
        <a :href="item.link">
          <img :src="item.pic"/>
        </a>
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{'active': currentScrollIndex === index}">
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Sliders } from '@/service/recommend'
import { userSlider } from './userSlide'
export default defineComponent({
  name: 'slider',
  props: {
    sliders: {
      type: Array as PropType<Sliders[]>,
      default () {
        return []
      }
    }
  },
  setup () {
    // 新建better-scroll instance 并维护当前索引状态
    const { currentScrollIndex, sliderRef } = userSlider()
    return {
      currentScrollIndex,
      sliderRef
    }
  }
})
</script>

<style lang="less" scoped>
  .slider {
    min-height: 1px;
    font-size: 0;
    touch-action: pan-y;
    position: relative;
    .slider-group {
      position: relative;
      overflow: hidden;
      white-space: nowrap;
      .slider-page {
        display: inline-block;
        transform: translate3d(0, 0, 0);
        backface-visibility: hidden;
        a {
          display: block;
          width: 100%;
        }
        img {
          display: block;
          width: 100%;
        }
      }
    }
    .dots-wrapper {
      position: absolute;
      left: 50%;
      bottom: 12px;
      line-height: 12px;
      transform: translateX(-50%);
      .dot {
        display: inline-block;
        margin: 0 4px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: @color-text-l;
        &.active {
          width: 20px;
          border-radius: 5px;
          background: @color-text-ll;
        }
      }
    }
  }
</style>
