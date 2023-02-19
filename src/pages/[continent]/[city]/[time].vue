<template>
  <NuxtLayout name="time">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as Record<string, string>
    const validTime = /([0-2][0-9][0-5][0-9])/.test(params.time)
    return validTime
  }
})

</script>
