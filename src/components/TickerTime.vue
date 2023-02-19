<template>
  <div class="is-size-4 has-text-weight-bold">
    {{ displayTime.toFormat('hh:mm:ss a') }}
  </div>
</template>
<script setup lang="ts">
import { DateTime } from 'luxon'
import { onDeactivated, ref } from 'vue'

const props = defineProps<{
    displayTZ: string
}>()

const displayTime = ref(DateTime.fromJSDate(new Date(), { zone: props.displayTZ }))
const ticker = setInterval(() => {
  displayTime.value = DateTime.fromJSDate(new Date(), { zone: props.displayTZ })
}, 1000)

onDeactivated(() => {
  if (ticker) {
    clearInterval(ticker)
  }
})
</script>
<style lang="scss" scoped></style>
