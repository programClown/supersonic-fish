import path from "path"
import { createDefineMock } from "vite-plugin-mock-dev-server"

export const defineMock = createDefineMock((mock) => {
  debugger
  // 拼接url
  mock.url = path.join(import.meta.env.VITE_APP_BASE_URL + "/api/v1/", mock.url)
  console.log("1233333333333333")
})
