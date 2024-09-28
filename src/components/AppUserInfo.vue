<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useUserStore } from '@/stores/userStore'

import UiList from '@/components/ui/UiNamedList.vue'

const {
  userAddress,
  userDetailsInfo,
  userCompanyInfo
} = storeToRefs(useUserStore())
</script>

<template>
  <nav class="user-info">
    <h2 class="user-info__title">Personal information</h2>
    <UiList :items="userDetailsInfo">Details</UiList>
    <UiList :items="userAddress">Address</UiList>
    <UiList :items="userCompanyInfo">Company</UiList>
  </nav>
</template>

<style scoped lang="scss">
@import "@/assets/styles/variables";

.user-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  grid-gap: 20px;
  width: 100%;
  height: max-content;

  &__title {
    grid-column: 1/4;
    font-size: 26px;
    color: $color-white-01;
  }
}

@media screen and (max-width: 767px) {
  .user-info {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;
    grid-gap: 20px;
    width: 100%;
    height: max-content;

    &__title {
      grid-column: 1/2;
    }
  }
}
</style>