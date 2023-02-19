<template>
    <div class="about">
        <div>This could mean one of these timezones, please pick one</div>
        <div v-for="tz in possibleTZs" :key="tz.value">
            <a :href="`/${tz.utc[0]}/${route.params.time}`">{{ tz.value }} </a>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { TimeZone } from '@/assets/timezones'
import { defineProps } from 'vue'
import { useRoute } from 'vue-router'
defineProps<{
    possibleTZs: TimeZone[]
}>()

const route = useRoute()
</script>

<style lang="scss" scoped></style>
