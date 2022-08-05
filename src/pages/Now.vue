<template>
    <div>
        <h1 class="title is-4">Time right now at {{displayTZ}} is {{displayTime.toFormat('hh:mm:ss a')}}</h1>
    </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/router'
import { getDisplayTZ } from '@/services/tzutils'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { DateTime } from 'luxon'

const route = useRoute()
const displayTZ = ref('Asia/Kolkata')
const displayTime = ref(DateTime.fromJSDate(new Date(), { zone: 'Asia/Kolkata' }))

if (route.name === ROUTES.ABBR_NOW) {
  const result = getDisplayTZ(route.params.tz as string)
  if (typeof result === 'string') {
    displayTZ.value = result
  } else {
    displayTZ.value = ''
  }
  // TODO: if multiple TZ show selector
  // TODO: if null, error and send to How page
}

if (route.name === ROUTES.IANA_NOW) {
  displayTZ.value = `${route.params.continent}/${route.params.city}`
}

if (displayTZ.value !== '') {
  displayTime.value = DateTime.fromJSDate(new Date(), { zone: displayTZ.value })
  setInterval(() => {
    displayTime.value = DateTime.fromJSDate(new Date(), { zone: displayTZ.value })
  }, 1000)
}

</script>

<style lang="scss">
</style>
