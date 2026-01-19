<template>
  <NuxtLayout name="time">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { isValidTimeString } from '@/time/parse'

definePageMeta({
  validate: (route) => {
    const params = route.params as Record<string, string>
    const validTime = isValidTimeString(params.time)
    return validTime
  }
})

</script>
