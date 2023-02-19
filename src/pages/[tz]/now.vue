<template>
  <div>NOW</div>
</template>

<script setup lang="ts">
definePageMeta({
  validate: (route) => {
    const params = route.params as Record<string, string>
    return /([A-Z]{2,4})/.test(params.tz)
  }
})
</script>
