<template>
  <section class="section" style="max-width: 800px;">
    <h1 class="title">Share time in different timezones</h1>
    <div>
      <div class="block">
        <p>Use this form to generate a link. The receiver of this link will see the time in their local timezone.</p>
      </div>

      <div class="columns">
        <div class="column is-9 field">
          <label class="label">Timezone</label>
          <div class="select">
            <select v-model="timezone">
              <option v-for="(tz, i) in timezones" :key="i" :value="tz.text">{{ tz.text }}</option>
            </select>
          </div>
        </div>
        <div class="column is-3 field">
          <label for="" class="label">Time</label>
          <input class="input" type="time" v-model="time" />
        </div>
      </div>

      <div class="block is-flex is-flex-direction-row is-align-items-center">
        <span class="title is-4" style="padding-right: 8px; margin-bottom: 0px;">
          {{ link }}
        </span>
        <button class="button is-white" @click="copyURL">
          <CopyIcon style="height: 28px;" />
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import CopyIcon from '@/assets/CopyIcon.vue'
import { timezones } from '@/assets/timezones'
import { computed } from '@vue/reactivity'
import { ref } from 'vue'

const myTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

const timezone = ref(timezones.find(tz => tz.utc.includes(myTimezone))?.text || '(UTC) Coordinated Universal Time')
const now = new Date()
const time = ref(`${minTwoDigits(now.getHours())}:${minTwoDigits(now.getMinutes())}`)
const link = computed(
  () => `${process.env.VUE_APP_BASE_URL}${timezones.find(tz => tz.text === timezone.value)?.abbr}/${time.value.substring(0, 2)
    }${time.value.substring(3, 5)}`
)

async function copyURL () {
  await navigator.clipboard.writeText(link.value)
}

function minTwoDigits (n: number) {
  return (n < 10 ? '0' : '') + n
}
</script>
