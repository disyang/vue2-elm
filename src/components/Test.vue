<template>
  <div class="hello">
    <a @click="test(1)" v-text="ha"></a>
    <span v-once>测试ing</span>
    <el-input v-model="input" style="width:200px;" placeholder="请输入内容"></el-input>
    <el-button type="primary" @click="cb">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: "test",
  props: {
    ha: Number
  },
  data() {
    return {
      input: ""
    };
  },
  methods: {
    test(a) {
      this.$emit("test", a);
      this.$emit("update:ha", a);
    },
    cb() {
      this.$router.push("/data/1");
    }
  }
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
  cursor: pointer;
}
</style>
