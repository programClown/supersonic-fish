<script lang="ts" setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUserStore } from "@/store/modules/user"
import { type FormInstance, type FormRules } from "element-plus"
import { User, Lock, Key, Picture, Loading } from "@element-plus/icons-vue"
import { getLoginCodeApi } from "@/api/login"
import { type LoginRequestData } from "@/api/login/types/login"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Owl from "./components/Owl.vue"
import { useFocus } from "./hooks/useFocus"

const router = useRouter()
const { isFocus, handleBlur, handleFocus } = useFocus()

const isNotMacOs = ref(process.platform !== "darwin")

/** 登录表单元素的引用 */
const loginFormRef = ref<FormInstance | null>(null)

/** 登录按钮 Loading */
const loading = ref(false)
/** 验证码图片 URL */
const codeUrl = ref("")
/** 登录表单数据 */
const loginFormData: LoginRequestData = reactive({
  username: "admin",
  password: "12345678",
  code: ""
})
/** 登录表单校验规则 */
const loginFormRules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
}
/** 登录逻辑 */
const handleLogin = () => {
  loginFormRef.value?.validate((valid: boolean, fields) => {
    if (valid) {
      loading.value = true
      useUserStore()
        .login(loginFormData)
        .then(() => {
          router.push({ path: "/" })
        })
        .catch(() => {
          createCode()
          loginFormData.password = ""
        })
        .finally(() => {
          loading.value = false
        })
    } else {
      console.error("表单校验不通过", fields)
    }
  })
}
/** 创建验证码 */
const createCode = () => {
  // 先清空验证码的输入
  loginFormData.code = ""
  // 获取验证码
  codeUrl.value = ""
  getLoginCodeApi().then((res) => {
    codeUrl.value =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAkCAIAAADNSmkJAAAFKUlEQVR4Xu2ZXUwcVRiGV70wMWo08V5NvPXCrDbFaGpMaZW2hqQxaoiJTRsaMBCNSYtpa2JTKiFSelFa+Q/QZcMWqEhBlh+htbEpZhMrBQrlJ0hBywLLyrJ0WZbje3bqOvPNLHPWrDvdOE9ONmfe78zkzMs335wzWJhJQrBQweS/wTQ6QWgYHdoIOcecOe05O+t2WkutO+p2ZF3Ksg/YV9ZW6FATYajR3nveg60H9327r3O8c35lHgp+r05dPdJzBL73TPSQ8SaCKIxGLsPlop+K0JHrEkPuoT31e5qGmmjARACF0agYyGVNlyVm/pzZXrN9fHGcBkz0UBid+31u93i3XFFT80vN8cvHqWqih8Lo1NpUqS5vwh3vnd223VQ10UNh9NbyrcFQUK6oCawHUipSqGqiB83oBf+CXFGDMp1mS6OqiR4Ko7FexkpOrqhpHGw82nOUqiZ6KIzGrkRuorW0dJMmOy+hOCfYGzb2RBFv6HRO0gEJw/U7y+pgL1bwmTxexN6sZ31TdEwEhdG+gA+7EqyXpUO1uZH20cWL8hMTRt1N9tBXzCJrOIRoCPJpSO2RAp4HmtCdIfZ+2JWgEBN9LbR28seTGU0Zue1tMLp+YIAMSADzfvbkKX4/eb28j4YODiGin3heqmIlLja5hAUCu+nmGY3JWKvpMAlqNGgebsauBOvlqSX+JEx7p7EbTLen53XlzfmWUioqXikrc68Y8N2juJ/fyVsNChGHEE//rBANYWaZz+TRQqpLaBgNsPfDrgSpbS21YtV87IdjrlkX9JZbt5DOma2t9ITo5F+5glN22WwL/n+yDv00mw06orKxOqQ5+J04hhViwzAXETIcJDVm8uxZqktoGx2Nj9t43Wgaul/ERQiGQvtbWnDWgZYW9CXlQFjZ/7ciyHNn+Z2MexTimIeLz59TiIln0M1e+IbPpOAaDUnEYPTi6iqKxpbycs/qKo1tCslfKcffPn9enuMiPPY1vxO/ckeFQ4h46cdGqUWoidE/y54q5tPY5WDrGzQqIXot4BgchEE57e00IMCw2/1qZSVO/7SjA78o9INzcxsbrL+fnTnDDh9mmZn8F30oG1Hm+nABv5mQMopDS/h1HxtqTzWbABMe9sxpPoe9zezeOo1GELqWhPS8t46M0IAYHbdvR1aHbaOjbjfLz2eFhez6dba4yAfgF30o0BFVE8+Mjh/wFxPI+I5mAEHU6Ls+38vhTFwOBGhMDF8gkFpbC5ffsdv/uBs6dIj19dExEtARVXv9YNbop8NFY3aZ6gRRo+tu3IBHnzmdNCBMXldXJKPfL74WzWUJRE+coDUknqsOdZXQbAJYwluVTbOZI3Qt8GFzMwxyjo3RgBiN4fr+elXVpZGRLWXl6PdOTtJBSlBDUK/lnIrjOlrtqWYTQDJaF6FrTXu9sOa1ysrVoM5HVE1GFxZQcyJ/p+xzv6K/rbr6N6+XDpUBl0tKFIrbz78qWB6YnWFMCBld4XLBms+7df75ook/GNzb0GCV7U1Qfz9p64TyQWNjYD3qe9rj4SMJtQP3MyjSDPzWIRHPjH7X4YAvfXoPuyZf9Pbi3PcuXIh4mp3NllYC6XY79C+jl2o8PBipxjnBttn4MgMNnWgfcRJGPI2OL8hTj3LloIlmRicvBhiNykvecpqoa3RSY4DRcLAwyicuOepVR1JjgNFYHWONHL04czTX0UmNAUYD7Pr+xc4wqTHGaBb2OtZvHUmNYUazcA2J6etdUmOk0f8rTKMTxF91RG0D1SwYGwAAAABJRU5ErkJggg==" //res.data
  })
}

const closeWindow = () => {
  window.vIpcRenderer.send("close")
}

/** 初始化验证码 */
createCode()
</script>

<template>
  <div class="login-container">
    <el-tooltip v-if="isNotMacOs" effect="dark" content="关闭" placement="bottom">
      <SvgIcon class="close-icon" name="close" @click="closeWindow" />
    </el-tooltip>

    <ThemeSwitch class="theme-switch" />
    <Owl :close-eyes="isFocus" />
    <div class="login-card">
      <div class="title">
        <img src="@/assets/layouts/logo-text-2.png" />
      </div>
      <div class="content">
        <el-form ref="loginFormRef" :model="loginFormData" :rules="loginFormRules" @keyup.enter="handleLogin">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginFormData.username"
              placeholder="用户名"
              type="text"
              tabindex="1"
              :prefix-icon="User"
              size="large"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginFormData.password"
              placeholder="密码"
              type="password"
              tabindex="2"
              :prefix-icon="Lock"
              size="large"
              show-password
              @blur="handleBlur"
              @focus="handleFocus"
            />
          </el-form-item>
          <el-form-item prop="code">
            <el-input
              v-model.trim="loginFormData.code"
              placeholder="验证码"
              type="text"
              tabindex="3"
              :prefix-icon="Key"
              maxlength="7"
              size="large"
            >
              <template #append>
                <el-image :src="codeUrl" @click="createCode" draggable="false">
                  <template #placeholder>
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </template>
                  <template #error>
                    <el-icon>
                      <Loading />
                    </el-icon>
                  </template>
                </el-image>
              </template>
            </el-input>
          </el-form-item>
          <el-button :loading="loading" type="primary" size="large" @click.prevent="handleLogin">登 录</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  -webkit-app-region: drag;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  .close-icon {
    position: fixed;
    padding: 4px;
    top: 4.5%;
    right: 3%;
    cursor: pointer;
    -webkit-app-region: no-drag;
    font-size: 28px;
    &:focus {
      outline: none;
    }
  }
  .close-icon:hover {
    background-color: rgba(232, 17, 35, 1);
    border: 1px;
  }
  .theme-switch {
    -webkit-app-region: no-drag;
    position: fixed;
    top: 5%;
    right: 7%;
    cursor: pointer;
  }

  .login-card {
    width: 480px;
    max-width: 90%;
    border-radius: 20px;
    box-shadow: 0 0 10px #dcdfe6;
    background-color: var(--el-bg-color);
    overflow: hidden;
    .title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      img {
        margin-top: 50px;
        height: 100%;
      }
    }
    .content {
      -webkit-app-region: no-drag;
      padding: 20px 50px 50px 50px;
      :deep(.el-input-group__append) {
        padding: 0;
        overflow: hidden;
        .el-image {
          width: 100px;
          height: 40px;
          border-left: 0px;
          user-select: none;
          cursor: pointer;
          text-align: center;
        }
      }
      .el-button {
        width: 100%;
        margin-top: 10px;
      }
    }
  }
}
</style>
