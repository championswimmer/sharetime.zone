<template>
  <NuxtLayout name="time">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as Record<string, string>
    const validTZ = /([A-Z]{2,4})/.test(params.tz)
    const validTime = /([0-2][0-9][0-5][0-9])/.test(params.time)
    return validTZ && validTime
  }
})
</script>
