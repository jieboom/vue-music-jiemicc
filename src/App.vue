<template>
  <div class="jiemicc-music">
    <div class="app-nav">
      <app-header></app-header>
      <app-tabs></app-tabs>
    </div>
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import appHeader from '@/components/app/appHeader.vue'
import appTabs from '@/components/app/appTabs.vue'
import { getRecommned, Albums, Sliders } from './service/recommend'

export default defineComponent({
  name: 'App',
  components: {
    appHeader,
    appTabs
  },
  data () {
    return {
      albums: [] as Albums[],
      sliders: [] as Sliders[]
    }
  },
  async created () {
    const { albums, sliders } = await getRecommned()
    this.albums = albums
    this.sliders = sliders
  }
})
</script>
<style lang="less">
.app-nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: @color-background;
}
.app-content {
  position: fixed;
  z-index: 99;
  top: 88px;
  bottom: 0;
  left: 0;
  right: 0;
  background: @color-background;
}
</style>
