import { request } from "@/utils/service"
import type * as Login from "./types/login"

/** 获取登录验证码 */
export function getLoginCodeApi() {
  // return request<Login.LoginCodeResponseData>({
  //   url: "login/code",
  //   method: "get"
  // })
  return new Promise<Login.LoginCodeResponseData>((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: "http://dummyimage.com/100x40/dcdfe6/000000.png&text=fish01", message: "获取成功" })
    }, 100)
  })
}

/** 登录并返回 Token */
export function loginApi(data: Login.LoginRequestData) {
  // return request<Login.LoginResponseData>({
  //   url: "users/login",
  //   method: "post",
  //   data
  // })
  return new Promise<Login.LoginResponseData>((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: { token: "token-yulao" }, message: "获取成功" })
    }, 100)
  })
}

/** 获取用户详情 */
export function getUserInfoApi() {
  return new Promise<Login.UserInfoResponseData>((resolve) => {
    setTimeout(() => {
      resolve({ code: 0, data: { username: "渔佬", roles: ["admin"] }, message: "获取成功" })
    }, 100)
  })

  // return request<Login.UserInfoResponseData>({
  //   url: "users/info",
  //   method: "get"
  // })
}
