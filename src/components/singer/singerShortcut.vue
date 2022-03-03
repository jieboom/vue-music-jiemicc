<template>
    <div class="jiemicc-singer-shortcut" ref="shortcutRef">
       <div :class="{'singer-shortcut-item':true,'active-title':activeGroupTitle === title}"  v-for="(title,index) in singerGroupTitle" :key="title" @click="handleShortcutClick(title,index)" @touchstart="handleTouch" @touchmove="handleTouch" >{{title}}</div>
    </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, toRefs } from 'vue'
import useShortcutClick from './useShortcutClick'
import useShortcutTouch from './useShortcutTouch'

export default defineComponent({
  name: 'SingerShortcut',
  emits: ['onShortcutClick'],
  expose: ['changeActiveGroupTitle'],
  props: {
    singerGroupTitle: {
      type: Array as PropType<string[]>,
      default: () => []
    }
  },
  setup (props, { emit }) {
    const { singerGroupTitle } = toRefs(props)
    const { activeGroupTitle, handleShortcutClick, changeActiveGroupTitle } = useShortcutClick(emit)
    const { handleTouch, shortcutRef } = useShortcutTouch(singerGroupTitle, handleShortcutClick, activeGroupTitle.value)
    return {
      handleTouch,
      shortcutRef,
      activeGroupTitle,
      changeActiveGroupTitle,
      handleShortcutClick
    }
  }

})
</script>

<style scoped lang="less">
.jiemicc-singer-shortcut{
    position: absolute;
    top: 50%;
    right: 4px;
    transform: translateY(-50%);
    background-color: @color-background-d;
    text-align: center;
    width: 20px;
    padding: 20px 0;
    border-radius: 10px;
    color: @color-text-l;
    font-size: @font-size-small;
    .singer-shortcut-item{
        padding: 3px;
        line-height: 1;
        &.active-title{
            color: #ffcd32;
        }
    }
}
</style>
