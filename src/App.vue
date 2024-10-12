<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view></router-view>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN'; // 中文
import enUS from 'ant-design-vue/es/locale/en_US'; // 英文
export default {
  name: 'App',
  data() {
    return {
      locale:zhCN
    }
  },

}
</script>
<style lang="less">

</style>
