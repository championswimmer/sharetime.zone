<template>
    <div>
        <h1
          v-if="showTime"
          class="title is-4">
        Time right now at {{displayTZ}} is {{displayTime.toFormat('hh:mm:ss a')}}
        </h1>
        <h1
          v-if="showError"
          class="title is-4">
        Given time zone {{displayTZ}} is not a valid timezone abbreviation.
        </h1>

        <h1
          v-if="showAmbiguous"
          class="title is-4">
        Given time zone {{displayTZ}} might mean any of the following. Please select one.
        </h1>
    </div>
</template>

<script setup lang="ts">
import { onDeactivated, Ref, ref } from 'vue'
import { DateTime } from 'luxon'
import { useTimezone } from '@/composables/tzdata'

const {
  displayTZ,
  showAmbiguous,
  showError,
  showTime
} = useTimezone()

let displayTime: Ref<DateTime>

let ticker: number | undefined

if (showTime.value === true) {
  displayTime = ref(DateTime.fromJSDate(new Date(), { zone: displayTZ.value }))
  ticker = setInterval(() => {
    displayTime.value = DateTime.fromJSDate(new Date(), { zone: displayTZ.value })
  }, 1000)
}

onDeactivated(() => {
  if (ticker) {
    clearInterval(ticker)
  }
})

</script>

<style lang="scss">
</style>
