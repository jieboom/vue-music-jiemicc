<template>
    <div class="app-loading">
      <img src="./loading.gif" >
      <span>{{title}}</span>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppLoading',
  data () {
    return {
      title: '正在载入中...'
    }
  }
})
</script>

<style scoped lang="less">
.app-loading{
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img{
    width: 24px;
    height: 24px;
    margin-bottom:  @space-s;
  }
  span {
     font-size: @font-size-small;
        color: @color-text-l;
  }
}
</style>
