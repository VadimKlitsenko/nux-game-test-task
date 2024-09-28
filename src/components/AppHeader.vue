<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/userStore'
import { NON_AUTHENTICATED_ROUTES, RouteNames } from '@/consts/router'

const route = useRoute()
const { userInfo } = storeToRefs(useUserStore())

const isUserInfoEnabled = computed<boolean>(() => {
  return !NON_AUTHENTICATED_ROUTES.includes(route.name as RouteNames)
})
</script>

<template>
  <header class="header">
    <template v-if="isUserInfoEnabled">
      <h2 class="header__title">{{ userInfo.name }}</h2>
      <h2 class="header__title">{{ userInfo.phone }}</h2>
    </template>
  </header>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 60px;
  padding: 5px 20px;
  background-color: $color-grey-02;


  &__title {
    color: $color-white-01;
    font-size: 24px;
  }
}
</style>