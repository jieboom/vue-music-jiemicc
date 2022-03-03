<template>
  <div class="jiemicc-recommend-wrapper" >
    <h5 class="jiemicc-recommend-title">热门歌单推荐</h5>
    <div class="jiemicc-recommend-list">
      <div class="jiemicc-recommend-item" v-for="item in albums" :key="item.id">
        <div class="recommend-item-left">
          <img class="recommend-item-picture" v-lazy="item.pic" alt="" />
        </div>
        <div class="recommend-item-right">
          <div class="recommend-item-name">{{ item.username }}</div>
          <div class="recommend-item-desc">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Albums } from '@/service/recommend'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'Recommend',
  props: {
    albums: {
      type: Array as PropType<Albums[]>,
      default () {
        return []
      }
    }
  }
})
</script>

<style scoped lang="less">
.jiemicc-recommend-wrapper {
  .jiemicc-recommend-title {
    color: @color-theme;
    text-align: center;
    line-height: 65px;
  }
  .jiemicc-recommend-item {
    display: flex;
    justify-content: space-between;
    height: 60px;
    margin: @space-mx;
    margin-top: 0;
    .recommend-item-left {
      .recommend-item-picture {
        width: 60px;
        height: 60px;
        margin-right: @space-m;
      }
    }
    .recommend-item-right {
      display: flex;
      flex: auto;
      flex-direction: column;
     justify-content: center;
      .recommend-item-name {
        color: @color-text;
        margin-bottom: @space-s;
      }
      .recommend-item-desc {
        color: @color-text-d;
      }
    }
  }
}
</style>
