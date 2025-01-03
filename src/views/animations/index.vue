<template>
  <div class="ani-container">
    <el-dropdown>
      <el-button class="ani-select" type="primary" size="large">
        {{ activeAnimationName }}<el-icon class="el-icon--right"><arrow-down /></el-icon>
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(ani, index) in animationList"
            :key="index"
            :disabled="activeAnimationName === ani.aniName"
            @click="(e: MouseEvent) => handleClick(e, ani.aniName)"
          >
            {{ ani.aniName }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button type="primary" link @click="copyLink"
      >{{ githubAniLink }}<el-icon class="el-icon--right"><document-copy /></el-icon
    ></el-button>
    <component class="ani-componet" :is="currentComponent" />
  </div>
</template>

<script lang="ts" setup>
import { useAnimations } from "@/hooks/useAnimations"
import { ArrowDown, DocumentCopy } from "@element-plus/icons-vue"
import ScatteredDots from "./components/ScatteredDots.vue"
import SierpinskiLoop from "./components/SierpinskiLoop.vue"
import { h, ref, shallowRef } from "vue"
import { ElNotification } from "element-plus"
const { clipboard } = require("electron")
const { animationList, activeAnimationName } = useAnimations()

interface AnimationComponents {
  name: string
  component: any
}

const aniComponents: AnimationComponents[] = [
  {
    name: "SierpinskiLoop",
    component: SierpinskiLoop
  },
  {
    name: "ScatteredDots",
    component: ScatteredDots
  }
]

const currentComponent = shallowRef(aniComponents[0].component)
activeAnimationName.value = aniComponents[0].name

const handleClick = (e, name) => {
  activeAnimationName.value = name
  currentComponent.value = aniComponents.find((item) => item.name === name)!.component
}

const githubAniLink = ref("https://github.com/Bleuje/processing-animations-code")
const copyLink = () => {
  clipboard.writeText(githubAniLink.value)
  ElNotification({
    title: "复制成功",
    message: h("i", { style: "color: teal" }, githubAniLink.value)
  })
}
</script>
<style scoped>
.ani-container {
  display: flex;
  flex-direction: column;
  justify-content: top;
  align-items: center;
  width: 100%;
  min-height: 100%;

  .ani-select {
    margin: 20px;
  }

  .ani-componet {
    width: 100%;
  }
}
</style>
