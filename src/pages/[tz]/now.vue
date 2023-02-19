<template>
  <div>
    <div v-if="showTime" class="has-text-centered">
      right now at
      <div class="has-text-weight-bold">
        ({{ displayTZAbbr }}) {{ displayTZ }}
      </div>
      the time is
      <TickerTime :display-t-z="displayTZ" />
    </div>
    <InvalidTZError v-if="showTZError" :display-t-z="displayTZ" />

    <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs" />
  </div>
</template>

<script setup lang="ts">
import { useTimezone } from '@/data/timezones'
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
import TickerTime from '@/components/TickerTime.vue'
import InvalidTZError from '@/components/InvalidTZError.vue'
definePageMeta({
  validate: (route) => {
    const params = route.params as Record<string, string>
    return /([A-Z]{2,4})/.test(params.tz)
  }
})

const {
  displayTZ,
  displayTZAbbr,
  showAmbiguous,
  showTZError,
  showTime,
  possibleTZs
} = useTimezone()

</script>
