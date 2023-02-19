<template>
    <div>
        <div
          v-if="showTime"
          class="has-text-centered">
        right now at
        <div class="has-text-weight-bold"> ({{ displayTZAbbr }}) {{ displayTZ }} </div>
        the time is
        <TickerTime :display-t-z="displayTZ"/>
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
import { useTimezone } from '@/composables/tzdata'
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
import TickerTime from '@/components/TickerTime.vue'

const {
  displayTZ,
  displayTZAbbr,
  showAmbiguous,
  showError,
  showTime,
  possibleTZs
} = useTimezone()

</script>

<style lang="scss">
</style>
