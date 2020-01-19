<template>
  <div class="main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="pass">
        <el-input v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button style="float:right" @click="resetForm('ruleForm')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
interface ruleForm {
  [key: string]: any;
}
interface rule {
  pass: string;
  checkPass: string;
  age: string;
}

@Component
export default class Login extends Vue {
  validatePass = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码"));
    } else {
      if (this.ruleForm.checkPass !== "") {
        (this.$refs["ruleForm"] as any).validateField("checkPass");
      }
      callback();
    }
  };
  validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码"));
    } else if (value !== this.ruleForm.pass) {
      callback(new Error("两次输入密码不一致!"));
    } else {
      callback();
    }
  };
  userName: string = "";
  passpord: string = "";
  ruleForm: rule = {
    pass: "",
    checkPass: "",
    age: ""
  };
  rules = {
    pass: [{ validator: this.validatePass, trigger: "blur" }],
    checkPass: [{ validator: this.validatePass2, trigger: "blur" }],
  };
}
</script>


<style lang="scss" scoped>
.main {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>