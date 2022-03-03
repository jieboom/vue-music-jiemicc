<template>
  <div class="app-tabs">
    <router-link
      class="app-tabs-item"
      v-for="(tab, index) in tabs"
      :key="index"
      :to="tab.path"
      active-class="app-tabs_active"
    >
      <span class="app-tabs-label">{{ tab.label }}</span>
    </router-link>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppTabs',
  data () {
    return {
      tabs: [
        {
          label: '推荐',
          path: '/recommend'
        },
        {
          label: '歌手',
          path: '/singer'
        },
        {
          label: '排行',
          path: '/ranklist'
        },
        {
          label: '搜索',
          path: '/search'
        }
      ]
    }
  }

})
</script>
<style scoped lang="less">
.app-tabs {
  display: flex;
  height: 44px;
  justify-content: space-between;
  .app-tabs-item {
    flex: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .app-tabs-label {
      display: inline-block;
      padding-bottom: @space-ss;
      border-bottom: 2px solid transparent;
    }
    &.app-tabs_active {
      color: @color-theme;
      .app-tabs-label {
        border-color: @color-theme;
      }
    }
  }
}
</style>
