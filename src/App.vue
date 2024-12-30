<script lang="ts" setup>
import { onMounted } from "vue"
import { useGreyAndColorWeakness } from "@/hooks/useGreyAndColorWeakness"
import zhCn from "element-plus/es/locale/lang/zh-cn" // Element Plus 中文包
import IpcDict from "@/constants/ipc-dict"
import { useTheme } from "@/hooks/useTheme"
import { APP_TITLE } from "@/hooks/useTitle"

const { initTheme } = useTheme()
const { initGreyAndColorWeakness } = useGreyAndColorWeakness()

/** 初始化主题 */
initTheme()
/** 初始化灰色模式和色弱模式 */
initGreyAndColorWeakness()

onMounted(() => {
  console.log(`Hello, ${APP_TITLE}! \n`)
  const winState: WinStateDTO = {
    width: 1024,
    height: 768,
    center: true,
    maxable: true,
    resizable: true
  }
  window.vIpcRenderer.send(IpcDict.CODE_01001, winState)
})
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>
