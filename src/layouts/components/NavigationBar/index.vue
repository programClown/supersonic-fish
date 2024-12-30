<script lang="ts" setup>
import { useRouter } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { useSettingsStore } from "@/store/modules/settings"
import { useUserStore } from "@/store/modules/user"
import { UserFilled } from "@element-plus/icons-vue"
import Hamburger from "../Hamburger/index.vue"
import Breadcrumb from "../Breadcrumb/index.vue"
import Sidebar from "../Sidebar/index.vue"
import Notify from "@/components/Notify/index.vue"
import ThemeSwitch from "@/components/ThemeSwitch/index.vue"
import Screenfull from "@/components/Screenfull/index.vue"
import SearchMenu from "@/components/SearchMenu/index.vue"
import { useDevice } from "@/hooks/useDevice"
import { useLayoutMode } from "@/hooks/useLayoutMode"
import { ref } from "vue"

const { isMobile } = useDevice()
const { isTop } = useLayoutMode()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { showNotify, showThemeSwitch, showScreenfull, showSearchMenu } = storeToRefs(settingsStore)

/** 切换侧边栏 */
const toggleSidebar = () => {
  appStore.toggleSidebar(false)
}

let isMax = ref<boolean>(false)
let normalMaxSvgName = ref("maximize")
let normalMaxTips = ref("最大化")

/** 登出 */
const logout = () => {
  userStore.logout()
  router.push("/login")
}

const miniWindow = () => {
  window.vIpcRenderer.send("min")
}

const updateWindowState = async () => {
  isMax.value = await window.vIpcRenderer.invoke("is-maximize")
  normalMaxSvgName.value = isMax.value ? "normal-size" : "maximize"
  normalMaxTips.value = isMax.value ? "最大化" : "正常"
}

const normalMaxWindow = () => {
  updateWindowState()
  window.vIpcRenderer.send("window-maximize")
}

const closeWindow = () => {
  window.vIpcRenderer.send("close")
}
</script>

<template>
  <div class="navigation-bar">
    <Hamburger
      v-if="!isTop || isMobile"
      :is-active="appStore.sidebar.opened"
      class="hamburger"
      @toggle-click="toggleSidebar"
    />
    <Breadcrumb v-if="!isTop || isMobile" class="breadcrumb" />
    <Sidebar v-if="isTop && !isMobile" class="sidebar" />
    <div class="right-menu">
      <SearchMenu v-if="showSearchMenu" class="right-menu-item" />
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <ThemeSwitch v-if="showThemeSwitch" class="right-menu-item" />
      <Notify v-if="showNotify" class="right-menu-item" />
      <el-dropdown class="right-menu-item">
        <div class="right-menu-avatar">
          <el-avatar :icon="UserFilled" :size="30" />
          <span>{{ userStore.username }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://github.com/un-pany/v3-admin-vite">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <a target="_blank" href="https://gitee.com/un-pany/v3-admin-vite">
              <el-dropdown-item>Gitee</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-tooltip effect="dark" content="最小化" placement="bottom">
        <SvgIcon class="svg-icon" name="minimizing" @click="miniWindow" />
      </el-tooltip>

      <el-tooltip effect="dark" :content="normalMaxTips" placement="bottom">
        <SvgIcon class="svg-icon" :name="normalMaxSvgName" @click="normalMaxWindow" />
      </el-tooltip>

      <el-tooltip effect="dark" content="关闭" placement="bottom">
        <SvgIcon class="close-icon svg-icon" name="close" @click="closeWindow" />
      </el-tooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navigation-bar {
  -webkit-app-region: drag;
  height: var(--v3-navigationbar-height);
  overflow: hidden;
  color: var(--v3-navigationbar-text-color);
  display: flex;
  justify-content: space-between;
  .hamburger {
    -webkit-app-region: no-drag;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
    cursor: pointer;
  }
  .breadcrumb {
    flex: 1;
    // 参考 Bootstrap 的响应式设计将宽度设置为 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }
  .sidebar {
    flex: 1;
    // 设置 min-width 是为了让 Sidebar 里的 el-menu 宽度自适应
    min-width: 0px;
    :deep(.el-menu) {
      background-color: transparent;
    }
    :deep(.el-sub-menu) {
      &.is-active {
        .el-sub-menu__title {
          color: var(--el-color-primary) !important;
        }
      }
    }
  }
  .right-menu {
    -webkit-app-region: no-drag;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;
      .right-menu-avatar {
        display: flex;
        align-items: center;
        .el-avatar {
          margin-right: 10px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }
  .svg-icon {
    margin-right: 4px;
    padding: 4px;
    font-size: 28px;
    &:focus {
      outline: none;
    }
  }
  .close-icon:hover {
    background-color: rgba(232, 17, 35, 1);
    border: 1px;
  }
}
</style>
