<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <div class="login-layout">
    <AppHeader/>

      <main class="login-layout__main">
        <slot/>
      </main>

    <footer class="login-layout__footer" />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

  .login-layout {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: max-content 1fr max-content;
    min-height: 100dvh;

    &__main {
      background-color: $color-grey-03;
    }

    &__footer {
      height: min(25vh, 270px);
      background-color: $color-grey-02;
    }
  }
</style>