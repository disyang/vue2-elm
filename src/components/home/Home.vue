<template>
  <section class="home">
    <header class="home_head">
      <a @click="$router.push('/home')">
        <img alt="" src="@assets/logo.png" class="home_img" />
      </a>
      <el-input v-model="message" style="width: 200px;" placeholder="请输入内容"></el-input>
      <section>
        <span>登录</span> |
        <span>注册</span>
      </section>
    </header>
  </section>
</template>

<script>
export default {
  data() {
    return {
      message: ""
    };
  }
};
</script>


<style lang="scss" scoped>
.home {
  height: 5rem;
  .home_img {
    height: 50px;
    cursor: pointer;
  }
  .home_head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>