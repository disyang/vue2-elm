<template>
  <div class="hello">
    <el-input style="width:200px;" v-model="input" placeholder="请输入内容12"></el-input>
    <span @click="test(2)">test</span>
    <el-button @click="cb" type="primary">主要按钮1</el-button>
  </div>
</template>

<script>
import { getdata1 } from '@api/getData';

export default {
  name: "HelloWorld",
  data: function() {
    return {
      mehui: 123,
      input: ""
    };
  },
  props: {
    msg: String
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  },
  methods: {
    hui(a, b) {
      this.$store.commit("add", a, b);
    },
    test(val) {
      this.$store.dispatch("addfun", val);
    },
    cb() {
      this.$router.push("/");
      getdata1({
        type: 1,
        id: 0,
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
}
</style>
