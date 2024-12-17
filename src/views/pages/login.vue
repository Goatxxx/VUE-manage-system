<template>
    <div class="login-bg">
      <div class="login-container">
        <div class="login-header">
          <img class="logo mr10" src="../../assets/img/logo.svg" alt="" />
          <div class="login-title">健康管理系统</div>
        </div>
        <el-form :model="param" :rules="rules" ref="login" size="large">
          <el-form-item prop="username">
            <el-input v-model="param.username" placeholder="用户名">
              <template #prepend>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                placeholder="密码"
                v-model="param.password"
                @keyup.enter="submitForm(login)"
            >
              <template #prepend>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="captcha" style="margin-bottom: 32px">
            <div class="vPicBox">
              <el-input v-model="param.captcha" style="width: 80px"></el-input>
              <div class="vPic" style="margin-left: 53px;">
                <div class="code" @click="refreshCode">
                  <s-identify :identify-code="identifyCode"></s-identify>
                </div>
              </div>
            </div>
          </el-form-item>
          <div class="pwd-tips">
            <el-checkbox class="pwd-checkbox" v-model="checked" label="记住密码" />
            <el-link type="primary" @click="$router.push('/reset-pwd')">忘记密码</el-link>
          </div>
          <el-button class="login-btn" type="primary" size="large" @click="submitForm(login)">登录</el-button>
          <p class="login-tips">Tips : 用户名和密码随便填。</p>
          <div style="display: flex;justify-content: space-between;">
            <p class="login-text">
              没有账号？<el-link type="primary" @click="$router.push('/register')">立即注册</el-link>
            </p>
            <el-button @click="resetForm()" style="margin-top: 14px;">重置</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import SIdentify from "@/components/SIdentify.vue";
  import { ref, reactive, onMounted } from 'vue';
  import { useTabsStore } from '@/store/tabs';
  import { usePermissStore } from '@/store/permiss';
  import { useRouter } from 'vue-router';
  import { ElMessage } from 'element-plus';
  import type { FormInstance, FormRules } from 'element-plus';
  
  interface LoginInfo {
    username: string;
    password: string;
    captcha: string; // 添加 captcha 字段
  }
  
  const identifyCode = ref('');
  const lgStr = localStorage.getItem('login-param');
  const defParam = lgStr ? JSON.parse(lgStr) : null;
  const checked = ref(!!lgStr);
  
  const router = useRouter();
  const param = reactive<LoginInfo>({
    username: defParam ? defParam.username : '',
    password: defParam ? defParam.password : '',
    captcha: defParam ? defParam.captcha : '',
  });
  
  const makeCode = (code: string, length: number) => {
    // 生成验证码的逻辑
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  const refreshCode = () => {
    identifyCode.value = makeCode('', 4); // 生成新的验证码
  };
  
  const validCode = (rule: any, value: string, callback: Function) => {
    if (identifyCode.value !== value) {
      refreshCode();
      callback(new Error("请输入正确的验证码"));
    } else {
      callback();
    }
  };
  
  const resetForm = () => {
    login.value?.resetFields()
  };
  
  const rules: FormRules = {
    username: [
      {
        required: true,
        message: '请输入用户名',
        trigger: 'blur',
      },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    captcha: [
      { required: true, message: '请输入验证码', trigger: 'blur' },
      { required: true, validator: validCode, trigger: 'blur' },
    ]
  };
  
  const permiss = usePermissStore();
  const login = ref<FormInstance>();
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid: boolean) => {
      if (valid) {
        ElMessage.success('登录成功');
        localStorage.setItem('vuems_name', param.username);
        const keys = permiss.defaultList[param.username === 'admin' ? 'admin' : 'user'];
        // const keys = permiss.defaultList['admin'];
        permiss.handleSet(keys);
        router.push('/');
        if (checked.value) {
          localStorage.setItem('login-param', JSON.stringify(param));
        } else {
          localStorage.removeItem('login-param');
        }
      } else {
        ElMessage.error('登录失败');
        return false;
      }
    });
  };
  
  onMounted(() => {
    refreshCode();
  });
  
  const tabs = useTabsStore();
  tabs.clearTabs();
  </script>
  
  <style scoped>
  .login-bg {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background: url(../../assets/img/background.jpg) center/cover no-repeat;
  }
  
  .login-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
  }
  
  .logo {
    width: 35px;
  }
  
  .login-title {
    font-size: 22px;
    color: #333;
    font-weight: bold;
  }
  
  .login-container {
    width: 450px;
    border-radius: 5px;
    background: #fff;
    padding: 40px 50px 50px;
    box-sizing: border-box;
  }
  
  .pwd-tips {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: -10px 0 10px;
    color: #787878;
  }
  
  .pwd-checkbox {
    height: auto;
  }
  
  .login-btn {
    display: block;
    width: 100%;
  }
  
  .login-tips {
    font-size: 12px;
    color: #999;
  }
  
  .login-text {
    display: flex;
    align-items: center;
    margin-top: 20px;
    font-size: 14px;
    color: #787878;
  }
  
  .vPicBox {
    display: flex;
    line-height: 0;
  }
  </style>
  