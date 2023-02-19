<template>
    <div>
        <div v-if="showTime" class="has-text-centered">
        right now at
          <div class="has-text-weight-bold"> ({{ displayTZAbbr }}) {{ displayTZ }} </div>
        the time is
          <TickerTime :display-t-z="displayTZ"/>
        </div>
        <InvalidTZError v-if="showError" :display-t-z="displayTZ"/>

        <DisambiguateTZ v-if="showAmbiguous" :possible-t-zs="possibleTZs"></DisambiguateTZ>
    </div>
</template>

<script setup lang="ts">
import { useTimezone } from '@/composables/tzdata'
import DisambiguateTZ from '@/components/DisambiguateTZ.vue'
import TickerTime from '@/components/TickerTime.vue'
import InvalidTZError from '@/components/InvalidTZError.vue'

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
