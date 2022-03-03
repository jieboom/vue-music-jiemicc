<template>
  <scroll @scroll="handleScroll" :probeType="3" ref="scrollRef">
    <div class="jiemicc-singer-list" ref="singerListRef">
      <div
        class="jiemicc-singer-group"
        v-for="group in singerGroupList"
        :key="group.title"
      >
        <div class="singer-list-title" ref="singerTitleRef">{{ group.title }}</div>
        <div class="singer-list-item-wrapper">
          <div
            class="singer-list-item oneline-cut"
            v-for="singer in group.list"
            :key="singer.id"
            @click="handleSingerItemClick(singer)"
          >
            <img width="50" height="50" v-lazy="singer.pic" />
            <span class="singer-name">{{ singer.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="singer-title-fixed singer-list-title" :style="{top:fixedTitleStyle.top+'px',display:fixedTitleStyle.isShow?'block':'none'}">
      {{ fixedTitle }}
    </div>
  </scroll>
</template>

<script lang='ts'>
import scroll from '@/components/base/scroll/scroll.vue'
import { Singer, SingerGroupList } from '@/service/singer'
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll'
import { ComponentPublicInstance, defineComponent, PropType, toRefs } from 'vue'
import useFixed from './useFixed'
export default defineComponent({
  name: 'SingerList',
  components: {
    scroll
  },
  emits: ['fixedTitleChange', 'onSingerClick'],
  expose: ['scrollToTitle'],
  props: {
    singerGroupList: {
      type: Array as PropType<SingerGroupList>,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const { singerGroupList } = toRefs(props)
    const { singerListRef, fixedTitle, handleScroll, scrollY, fixedTitleStyle, groupHeightList } = useFixed(singerGroupList, emit)
    function handleSingerItemClick (singer:Singer) {
      emit('onSingerClick', singer)
    }
    return {
      singerListRef,
      fixedTitle,
      handleScroll,
      scrollY,
      fixedTitleStyle,
      groupHeightList,
      handleSingerItemClick
    }
  },
  methods: {
    scrollToTitle (index:number) {
      ((this.$refs.scrollRef as ComponentPublicInstance<Record<string, unknown>>).scroller as BScrollConstructor).scrollTo(0, -this.groupHeightList[index])
    }
  }
})

</script>

<style scoped lang="less">
.jiemicc-singer-list {
  .jiemicc-singer-group {
    .singer-list-title {
      height: 30px;
      line-height: 30px;
      color: @color-text-l;
      font-size: @font-size-small;
      background-color: @color-highlight-background;
      padding-left: @space-mx;
    }
    .singer-list-item {
      height: 70px;
      box-sizing: border-box;
      padding: @space-mx @space-lx 0 @space-lx;
      color: @color-text-l;
      &:last-child {
        height: calc(@space-lx + 70px);
      }
      img {
        vertical-align: middle;
      }
      .singer-name {
        margin-left: @space-mx;
        font-size: @font-size-medium;
        color: @color-text-l;
      }
    }
  }
}
.singer-title-fixed {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: @color-text-l;
  font-size: @font-size-small;
  background-color: @color-highlight-background;
  padding-left: @space-mx;
}
</style>
