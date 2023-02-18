<template>
    <div>
        <h1 v-if="showTime" class="title is-4">
            Time {{displayTime.toFormat('hh:mm a')}}
            of this timezone {{displayTZ}} at your place is
            {{localTime.toFormat('hh:mm a')}}
            <span v-if="dayDelta"> {{dayDelta}} </span>
        </h1>
        <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs"></DisambiguateTZ>
        <div v-if="showError">
            <h1 class="title is-4">
                Given time zone {{displayTZ}} is not a valid timezone.
            </h1>
            <h1 class="title is-4">
                Please try again.
            </h1>
        </div>
    </div>
</template>

<script setup lang="ts">
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
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
