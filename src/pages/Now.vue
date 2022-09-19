<template>
    <Head>
        <title>Time at {{displayTZ}} is {{displayTime.toFormat('hh:mm:ss a')}}</title>
        <meta name="description" :content='`Time right now at ${displayTZ} is ${displayTime.toFormat("hh:mm:ss a")}`'>
        <meta property="og:url" content="http://sharetime.zone/" />
        <meta name="description" :content='`Time right now at ${displayTZ} is ${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta name="keywords" content="sharetime" />
        <meta property="og:type" content="website" />
        <meta property="og:title" :content='`Time at ${displayTZ} is ${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta property="og:image" :content='`https://og-image-sharetime.vercel.app/now.png?desc=${displayTZ}&desc=${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta property="og:description" :content='`Time right now at ${displayTZ} is ${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta property="og:site_name" content="sharetime.zone" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content='`Time at ${displayTZ} is ${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta name="twitter:description" :content='`Time right now at ${displayTZ} is ${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta name="twitter:image:src" :content='`https://og-image-sharetime.vercel.app/now.png?desc=${displayTZ}&desc=${displayTime.toFormat("hh:mm:ss a")}`' />
    </Head>
    <div>
        <h1
          v-if="showTime"
          class="title is-4">
        Time right now at {{displayTZ}} is {{displayTime.toFormat('hh:mm:ss a')}}
        </h1>
        <h1
          v-if="showError"
          class="title is-4">
        Given time zone {{displayTZ}} is not a valid timezone abbreviation.
        </h1>

        <h1
          v-if="showAmbiguous"
          class="title is-4">
        Given time zone {{displayTZ}} might mean any of the following. Please select one.
        </h1>
    </div>
</template>

<script setup lang="ts">
import { onDeactivated, Ref, ref } from 'vue'
import { DateTime } from 'luxon'
import { useTimezone } from '@/composables/tzdata'

const {
  displayTZ,
  showAmbiguous,
  showError,
  showTime
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
