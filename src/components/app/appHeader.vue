<template>
  <div class="app-header">
    <span class="app-header-logo"></span>
    <span class="app-header-title">jiemicc music</span>
    <router-link to="/user" class="app-header-user">
      <i class="icon-mine"></i>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'AppHeader'
})
</script>

<style scoped lang="less">
.app-header {
  height: 44px;
  text-align: center;
  color: @color-theme;
  position: relative;
  .app-header-logo {
    display: inline-block;
    width: 30px;
    height: 32px;
    margin-top: @space-ss;
    margin-right: @space-s;
    background-size: 100% 100%;
    vertical-align: top;
    .bg-image("~@/assets/images/logo");
  }
  .app-header-title {
    display: inline-block;
    line-height: 44px;
    font-size: @font-size-large;
  }
  .app-header-user{
    position: absolute;
    top: 0;
    right: @space-s;
    .icon-mine{
      font-size: @font-size-large-x;
      color: @color-theme;
      line-height: 44px;
    }
  }
}
</style>
