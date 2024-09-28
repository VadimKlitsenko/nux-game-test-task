<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="base-layout">
    <AppHeader/>
    <main>
      <slot/>
    </main>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.base-layout {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  min-height: 100dvh;
}
</style>