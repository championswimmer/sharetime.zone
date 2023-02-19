<template>
  <div class="has-text-centered">
    <div class="is-size-5">
      <span class="has-text-danger has-text-weight-bold">{{ displayTZ }}</span>
      is not a valid timezone 😵
    </div>
    <br>
    <div>Please try again</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
    displayTZ: string
}>()
</script>
