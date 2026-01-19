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
    const validTZ = /([A-Z]{2,4})/.test(params.tz)
    const validTime = isValidTimeString(params.time)
    return validTZ && validTime
  }
})
</script>
