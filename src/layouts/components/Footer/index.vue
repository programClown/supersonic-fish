<script lang="ts" setup>
import { APP_TITLE } from "@/hooks/useTitle"
import dayjs from "dayjs"
</script>

<template>
  <footer class="layout-footer">supersonic {{ dayjs().year() }} {{ APP_TITLE }}</footer>
</template>

<style lang="scss" scoped>
.layout-footer {
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--el-text-color-placeholder);
}
</style>
