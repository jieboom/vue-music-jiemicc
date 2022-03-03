<template>
    <div class="jiemicc-singer" v-loading="!singerListLoaded">
       <singer-list ref="singerListRef" :singerGroupList="singerGroupList" @fixedTitleChange="changeShorcutActiveTitle" @onSingerClick="handleSingerClick"></singer-list>
       <singer-shortcut ref="singerShortcutRef" :singerGroupTitle="singerGroupTitle" @onShortcutClick="handleShortCutClick"></singer-shortcut>
       <router-view :singerInfo="selectedSingerInfo"></router-view>
    </div>
</template>

<script lang='ts'>
import singerList from '@/components/singer/singerList.vue'
import { getSingerList, Singer, SingerGroupList } from '@/service/singer'
import { ComponentPublicInstance, defineComponent } from 'vue'
import singerShortcut from '@/components/singer/singerShortcut.vue'
export default defineComponent({
  name: 'AppSinger',
  components: {
    singerList,
    singerShortcut
  },
  data () {
    return {
      singerGroupList: [] as SingerGroupList,
      selectedSingerInfo: {} as Singer
    }
  },
  computed: {
    singerGroupTitle ():string[] {
      return this.singerGroupList.map(item => item.title)
    },
    singerListLoaded ():boolean {
      return this.singerGroupList.length > 0
    }
  },
  async created () {
    try {
      const singerGroupList = await getSingerList()
      this.singerGroupList = singerGroupList.singers
    } catch (error) {
      console.log(error)
    }
  },
  updated () {
    if (this.singerListLoaded) {
      this.changeShorcutActiveTitle(this.singerGroupTitle[0])
    }
  },
  methods: {
    handleShortCutClick (index:number) {
      (this.$refs.singerListRef as ComponentPublicInstance<unknown, unknown, unknown, Record<string, never>, {scrollToTitle:(index:number) => void}>).scrollToTitle(index)
    },
    changeShorcutActiveTitle (title:string) {
      (this.$refs.singerShortcutRef as ComponentPublicInstance<unknown, unknown, unknown, Record<string, never>, {changeActiveGroupTitle:(title:string) => void}>).changeActiveGroupTitle(title)
    },
    handleSingerClick (singerInfo: Singer) {
      this.selectedSingerInfo = singerInfo
      this.$router.push('/singer/' + singerInfo.mid)
    }
  }
})
</script>

<style scoped lang="less">
.jiemicc-singer{
   height: 100%;
}
</style>
