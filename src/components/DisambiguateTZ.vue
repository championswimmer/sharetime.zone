<template>
  <div class="about has-text-centered">
    <div class="my-4">
      <div class="has-text-weight-bold has-text-info is-size-5">
        {{ tzAbbr }}
      </div>
      could mean multiple timezones
      <br>
      please pick one
    </div>
    <div v-for="tz in possibleTZs" :key="tz.value" class="my-1">
      <a :href="`/${tz.utc[0]}/${route.params?.time?? 'now' }`">▶ {{ tz.value }} </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import type { TimeZone } from '../data/timezones'
defineProps<{
    possibleTZs: TimeZone[]
}>()

const route = useRoute()
const tzAbbr = route.params.tz
</script>

<style lang="scss" scoped></style>
