<template>
    <div>
        <div
          v-if="showTime"
          class="has-text-centered">
        Time right now at {{displayTZ}} is {{displayTime.toFormat('hh:mm:ss a')}}
        </div>
        <div
          v-if="showError"
          class="title is-4">
        Given time zone {{displayTZ}} is not a valid timezone abbreviation.
        </div>

        <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs"></DisambiguateTZ>
    </div>
</template>

<script setup lang="ts">
import { onDeactivated, Ref, ref } from 'vue'
import { DateTime } from 'luxon'
import { useTimezone } from '@/composables/tzdata'
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'

const {
  displayTZ,
  showAmbiguous,
  showError,
  showTime,
  possibleTZs
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
