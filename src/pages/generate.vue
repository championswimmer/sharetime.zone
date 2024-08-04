<template>
  <div class="home">
    <div>
      <h1 class="title is-4">
        Generate a shareable link
      </h1>
    </div>
    <div>
      <input v-model="searchQuery" class="searchInput" placeholder="Search timezone, city, continent" @input="clearSelectedTimezone">
      <button class="clearButton" @click="handlerClearData">
        Clear
      </button>
    </div>
    <div v-if="searchQuery && !selectedTimeZone">
      <div v-for="(items, tzAbbr, index) in filteredTimezones" :key="tzAbbr + index">
        <ul>
          <li v-for="item in items" :key="item.value" class="item" @click="handleSelectTimezone(item, tzAbbr)">
            {{ tzAbbr }} {{ item.text }} ({{ item.utc.join(', ') }})
          </li>
        </ul>
      </div>
    </div>
    <p v-if="searchQuery && Object.keys(filteredTimezones).length === 0">
      No Results found
    </p>

    <div v-if="selectedTimeZone">
      <h3 class="secondaryTitle">
        You have selected
      </h3>
      <p>{{ selectedTimeZone.value }}</p>
      <p>{{ selectedTimeZone.text }}</p>
      <p>{{ selectedTimeZone.utc.toString() }}</p>
      <p class="secondaryTitle">
        Select time
      </p>
      <input type="time" @input="handleTimeInput">
      or
      <button @click="handleTimeInput">
        now
      </button>
    </div>
    <div v-if="url">
      <h3 class="secondaryTitle">
        URL
      </h3>
      <p>{{ url }}</p>
    </div>
    <div>
      <button v-if="selectedTime" class="button" @click="handleCopyUrl">
        <img class="copyIcon" src="/copy-icon.svg" alt="">
        Copy URL
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onUpdated } from 'vue'
import { getDisplayTZ, checkValidTZ } from '@/data/timezones'
import { useTimezoneSearch } from '@/data/searchTimezones'

const selectedTimeZone = ref(null)
const selectedTime = ref('')
const displayTz = ref('')
const url = ref('')

const { searchQuery, filteredTimezones } = useTimezoneSearch()

const handleSelectTimezone = (timezone: any, tzAbbr:string) => {
  displayTz.value = tzAbbr
  selectedTimeZone.value = timezone
}

const clearSelectedTimezone = () => {
  selectedTimeZone.value = null
}

const handleTimeInput = (event: Event) => {
  if (event.target.value) {
    const input = event.target as HTMLInputElement
    selectedTime.value = input.value.toString().replace(':', '')
  } else {
    selectedTime.value = 'now'
  }
}

const handleCopyUrl = () => {
  const urlValue = `https://sharetime.zone/${displayTz.value}/${selectedTime.value}`
  url.value = urlValue
  navigator.clipboard.writeText(url.value.toString())
}

const handlerClearData = () => {
  selectedTimeZone.value = null
  selectedTime.value = ''
  displayTz.value = ''
  url.value = ''
  searchQuery.value = ''
}

onUpdated(() => {
  if (selectedTime.value) {
    const urlValue = `https://sharetime.zone/${displayTz.value}/${selectedTime.value}`
    url.value = urlValue
  }
})

</script>

<style scoped>
.item {
  cursor: pointer;
  padding: 0.5rem;
  border: 0.5px solid gray;
  transition: 0.2s;
  max-width: 500px;
}
.item:hover {
  background-color: rgb(229, 227, 227);
}
.searchInput{
  width: 320px;
  padding: 8px 20px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  margin-top: 25px;

}
.clearButton{
  cursor: pointer;
  padding: 8px 20px;
  margin-left: 16px;
}
.secondaryTitle{
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
  margin-bottom: 6px;
}
.button{
  cursor: pointer;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.copyIcon{
  width: 18px;
  height: 18px;
  padding-right: 4px;
}
</style>
