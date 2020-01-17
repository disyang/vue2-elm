<template>
  <div>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  checkAge = (rule: any, value: number, callback: any) => {
    if (!value) {
      return callback(new Error("年龄不能为空"));
    }
    setTimeout(() => {
      if (!Number.isInteger(value)) {
        callback(new Error("请输入数字值"));
      } else {
        if (value < 18) {
          callback(new Error("必须年满18岁"));
        } else {
          callback();
        }
      }
    }, 1000);
  };
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
    age: [{ validator: this.checkAge, trigger: "blur" }]
  };
}
</script>


<style lang="scss" scoped>
</style>