<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}
</style>
