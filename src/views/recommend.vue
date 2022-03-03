<template>
  <div class="jiemicc-recommend" v-loading:[loadingText]="!(albums.length && sliders.length)">
    <scroll>
      <div class="scroll-content">
        <slide :sliders="sliders" v-if="sliders.length"/>
        <recommend v-if="albums.length" :albums="albums"/>
      </div>
    </scroll>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Slide from '@/components/base/slide/slide.vue'
import recommend from '@/components/recommend/recommend.vue'
import { getRecommned, Albums, Sliders } from '@/service/recommend'
import scroll from '@/components/base/scroll/scroll.vue'

export default defineComponent({
  name: 'AppRecommend',
  components: {
    Slide,
    recommend,
    scroll
  },
  props: {},
  data () {
    return {
      albums: [] as Albums[],
      sliders: [] as Sliders[],
      loadingText: '正在加载中...'
    }
  },
  async created () {
    const { albums, sliders } = await getRecommned()
    this.albums = albums
    this.sliders = sliders
  },
  methods: {}
})
</script>

<style scoped lang="less">
.jiemicc-recommend {
  height: 100%;
}
</style>
