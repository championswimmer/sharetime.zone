<template>
    <Head>
        <title>Time {{displayTime.toFormat('hh:mm a')}} of this timezone {{displayTZ}} at your place is {{localTime.toFormat('hh:mm a')}}</title>
        <meta name="description" :content='`Time ${displayTime.toFormat("hh:mm a")} of this timezone ${displayTZ} at your place is ${localTime.toFormat("hh:mm a")}`'>
        <meta property="og:url" content="http://sharetime.zone/" />
        <meta name="description" :content='`Time ${displayTime.toFormat("hh:mm a")} of this timezone ${displayTZ} at your place is ${localTime.toFormat("hh:mm a")}`' />
        <meta name="keywords" content="sharetime" />
        <meta property="og:type" content="website" />
        <meta property="og:title" :content='`Time ${displayTime.toFormat("hh:mm a")} of this timezone ${displayTZ} at your place is ${localTime.toFormat("hh:mm a")}`' />
        <meta property="og:image" :content='`https://og-image-sharetime.vercel.app/time.png?desc=${displayTime.toFormat("hh:mm:ss a")}&desc=${displayTZ}&desc=${displayTime.toFormat("hh:mm:ss a")}`' />
        <meta property="og:description" :content='`Time ${displayTime.toFormat("hh:mm a")} of this timezone ${displayTZ} at your place is ${localTime.toFormat("hh:mm a")}`' />
        <meta property="og:site_name" content="sharetime.zone" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" :content='`Time ${displayTime.toFormat("hh:mm a")} of this timezone ${displayTZ} at your place is ${localTime.toFormat("hh:mm a")}`' />
        <meta name="twitter:description" :content='`Time ${displayTime.toFormat("hh:mm a")} of this timezone ${displayTZ} at your place is ${localTime.toFormat("hh:mm a")}`' />
        <meta name="twitter:image:src" :content='`https://og-image-sharetime.vercel.app/time.png?desc=${displayTime.toFormat("hh:mm:ss a")}&desc=${displayTZ}&desc=${displayTime.toFormat("hh:mm:ss a")}`' />
    </Head>
    <div>
        <h1 v-if="showTime" class="title is-4">
            Time {{displayTime.toFormat('hh:mm a')}}
            of this timezone {{displayTZ}} at your place is
            {{localTime.toFormat('hh:mm a')}}
            <span v-if="dayDelta"> {{dayDelta}} </span>
        </h1>
    </div>
</template>

<script setup lang="ts">import { useTimezone } from '@/composables/tzdata'
import { DateTime } from 'luxon'
import { useRoute } from 'vue-router'

const {
  displayTZ,
  showAmbiguous,
  showError,
  showTime
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
