<script lang="ts" setup>
import { useUserStore } from "@/store/modules/user"
import Welcome from "./components/Welcome.vue"

const userStore = useUserStore()
const isAdmin = userStore.roles.includes("admin")
</script>

<template>
  <Welcome />
</template>
