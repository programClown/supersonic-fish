<template>
  <div class="app-container center">
    <el-image :src="srcImg"> </el-image>
  </div>
</template>

<script lang="ts" setup>
import srcImg from "@/assets/layouts/logo.png"
</script>

<style lang="scss" scoped>
.center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
