<template>
    <div class="jiemicc-singer-detail">
    歌手详情
    </div>
</template>

<script lang='ts'>
import { getSingerDetail, getSongUrls, Singer, Song } from '@/service/singer'
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  name: 'singerDetail',
  components: {

  },
  props: {
    singerInfo: {
      type: Object as PropType<Singer>,
      default: () => ({ })
    }

  },
  async  created () {
    const singerSongs = await getSingerDetail({ mid: this.singerInfo.mid })
    if (singerSongs.songs.length > 0) {
      this.songs = singerSongs.songs
      const songsUrl = await getSongUrls({ mid: singerSongs.songs.map(item => item.mid) })
      this.songs = singerSongs.songs.map(item => {
        item.url = songsUrl.map[item.mid]
        return item
      })
    }
  },
  data () {
    return {
      songs: [] as Song[]
    }
  },
  methods: {

  }
})
</script>

<style scoped lang="less">
 .jiemicc-singer-detail{
     position: fixed;
     z-index: 20;
     top:0;
     bottom: 0;
     left: 0;
     right: 0;
     background: @color-background;
 }
</style>
