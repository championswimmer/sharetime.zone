<template>
  <div class="is-size-4 has-text-weight-bold">
    {{ displayTime.toFormat('hh:mm a') }}
  </div>
</template>
<script setup lang="ts">
import { DateTime } from 'luxon'
import { defineProps } from 'vue'

defineProps<{
    displayTime: DateTime
}>()
</script>
<style lang="scss" scoped></style>
