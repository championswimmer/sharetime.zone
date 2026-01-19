<template>
  <div>
    <div v-if="showTime" class="column is-centered has-text-centered">
      <StaticTime :display-time="displayTime" />
      in the timezone
      <div class="has-text-weight-bold">
        ({{ displayTZAbbr }}) {{ displayTZ }}
      </div>
      at your place is
      <StaticTime :display-time="localTime" />
      <span v-if="dayDelta"> {{ dayDelta }} </span>
    </div>
    <InvalidTZError v-if="showTZError" :display-t-z="displayTZ" />
    <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs" />
  </div>
</template>

<script setup lang="ts">
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
import StaticTime from '@/components/StaticTime.vue'
import InvalidTZError from '@/components/InvalidTZError.vue'
import { useTimezone } from '@/data/timezones'
import { toMilitaryFormat } from '@/time/parse'

const {
  displayTZ,
  displayTZAbbr,
  showAmbiguous,
  showTZError,
  showTime,
  possibleTZs
} = useTimezone()

const route = useRoute()
const headers = useRequestHeaders()

const militaryTime = toMilitaryFormat(route.params.time as string) || '0000'
const displayTime = DateTime.fromFormat(militaryTime, 'HHmm', { zone: displayTZ.value })
const localTime = headers['x-user-timezone'] ? displayTime.setZone(headers['x-user-timezone']) : displayTime.setZone('local')

let dayDelta: string | undefined
if (localTime.day - displayTime.day === 1) {
  dayDelta = '(+1 day)'
} else if (localTime.day - displayTime.day === -1) {
  dayDelta = '(-1 day)'
}

</script>
