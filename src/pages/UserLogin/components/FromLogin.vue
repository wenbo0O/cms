<template>
  <div class="FromLogin">
    <div class="template-form-login-banner">
      <img src="@/assets/images/UserLogin/loginimg.png" alt="imgcode" />
    </div>

    <div class="template-form-login-container">
      <el-form ref="form" :model="ruleForm" label-width="80px">
        <el-form-item label="单位编码">
          <el-input v-model="ruleForm.unit"></el-input>
        </el-form-item>

        <el-form-item label="登录账户">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input type="password" v-model="ruleForm.pwd"></el-input>
        </el-form-item>

        <el-form-item label>
          <div class="imgcode">
            <img :src="imgCodePath" alt="imgcode" />
            <span @click="onChangeCode">刷新</span>
          </div>
        </el-form-item>

        <el-form-item label="验证码" prop="baseReqDto">
          <el-input v-model="ruleForm.baseReqDto" placeholder="请输入验证码"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import mixin from "./Mixins";
import { _getCaptchaBase64 } from "@/api/UserLogin";
import { catchErr } from "@/utils/utils";

export default {
  mixins: [mixin],

  data() {
    return {
      imgCodePath: ""
    };
  },
  computed: {
    ruleForm() {
      return this.UserLogin.ruleForm;
    }
  },

  methods: {
    onSubmit() {
      this.sendLogin();
    },

    async onChangeCode() {
      let [err, res] = await catchErr(_getCaptchaBase64());
      if (res) {
        this.imgCodePath = res.data;
      }
    }
  },

  created() {
    this.onChangeCode();
  }
};
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
.FromLogin {
  width: 1200px;
  height: 660px;
  margin: 138px auto 0;
  background: #fff;
  display: flex;
  align-items: center;
}

.template-form-login-banner {
  float: left;
  width: 440px;
}

.template-form-login-container {
  float: left;
  width: 600px;

  .imgcode {
    img {
      width: 100px;
      height: 50px;
    }

    span {
      margin: 0 0 0 30px;
    }
  }
}
</style>



