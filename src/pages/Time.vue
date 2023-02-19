<template>
    <div>
        <div v-if="showTime" class="column is-centered has-text-centered">
            <StaticTime :display-time="displayTime"/>
            in the timezone
            <div class="has-text-weight-bold"> ({{ displayTZAbbr }}) {{ displayTZ }} </div>
            at your place is
            <StaticTime :display-time="localTime"/>
            <span v-if="dayDelta"> {{dayDelta}} </span>
        </div>
        <InvalidTZError v-if="showError" :display-t-z="displayTZ"/>
        <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs"></DisambiguateTZ>
    </div>
</template>

<script setup lang="ts">
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
import StaticTime from '@/components/StaticTime.vue'
import InvalidTZError from '@/components/InvalidTZError.vue'
import { useTimezone } from '@/composables/tzdata'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'

const {
  displayTZ,
  displayTZAbbr,
  showAmbiguous,
  showError,
  showTime,
  possibleTZs
} = useTimezone()

const route = useRoute()

const displayTime = DateTime.fromFormat((route.params.time as string), 'HHmm', { zone: displayTZ.value })
const localTime = displayTime.setZone('local')

let dayDelta: string | undefined

if (localTime.day - displayTime.day === 1) {
  dayDelta = '(+1 day)'
} else if (localTime.day - displayTime.day === -1) {
  dayDelta = '(-1 day)'
}

</script>

<style lang="scss">
</style>
