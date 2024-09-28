<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import type { Component } from 'vue'

import { LayoutNames } from '@/consts/router'

import AppLoginLayout from '@/layouts/LoginLayout.vue'
import AppDefaultLayout from '@/layouts/BaseLayout.vue'

const route = useRoute()

const layout = computed<Component>(() => {
  switch(route.meta.layout) {
    case LayoutNames.LOGIN: {
      return AppLoginLayout
    }
    default: {
      return AppDefaultLayout
    }
  }
})
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>