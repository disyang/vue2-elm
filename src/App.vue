<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div>{{$t("message.hello")}}</div>
    <el-button v-once @click="$i18n.locale = ($i18n.locale == 'zh') ? 'en' : 'zh'">切换语言</el-button>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
