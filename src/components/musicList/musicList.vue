<template>
  <div class="music-list">
    <div class="music-list-header">
      <span class="icon-back"></span>
      <span class="music-list-title">{{ title }}</span>
    </div>
    <div class="music-list-bg">
      <div class="music-random-play" :style="listBgStyle">
        <i class="icon-play"></i>
        <span class="music-random-play-text">随机播放全部</span>
      </div>
    </div>
    <div class="music-list-content"></div>
  </div>
</template>

<script lang='ts'>
import { Song } from '@/service/singer'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'MusicList',
  components: {},
  data () {
    return {
      test: ''
    }
  },
  props: {
    title: String,
    pic: String,
    songs: {
      type: Array as PropType<Song[]>,
      default () {
        return []
      }
    }
  },
  computed: {
    listBgStyle ():Record<string, string> {
      return {
        backgroundImage: `url('${this.pic}')`
      }
    }
  },
  methods: {}
})
</script>

<style scoped lang="less">
</style>
