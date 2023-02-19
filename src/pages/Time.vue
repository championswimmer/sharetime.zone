<template>
    <div>
        <div v-if="showTime" class="column is-centered has-text-centered">
            <StaticTime :display-time="displayTime"/>
            in the timezone
            <div class="has-text-weight-bold"> ({{ route.params.tz }}) {{ displayTZ }} </div>
            at your place is
            <StaticTime :display-time="localTime"/>
            <span v-if="dayDelta"> {{dayDelta}} </span>
        </div>
        <div v-if="showError">
            <h1 class="title is-4">
                Given time zone {{displayTZ}} is not a valid timezone.
            </h1>
            <h1 class="title is-4">
                Please try again.
            </h1>
        </div>
        <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs"></DisambiguateTZ>
    </div>
</template>

<script setup lang="ts">
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
import StaticTime from '@/components/StaticTime.vue'
import { useTimezone } from '@/composables/tzdata'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'

const {
  displayTZ,
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
