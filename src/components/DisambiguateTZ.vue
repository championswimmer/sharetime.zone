<template>
    <div class="about">
        <h1>This is an about page</h1>
    </div>
</template>

<script lang="ts" setup>
import { TimeZone } from '@/assets/timezones'
import { defineProps } from 'vue'
defineProps<{
    possibleTZs: TimeZone[]
}>()
</script>

<style lang="scss" scoped></style>
