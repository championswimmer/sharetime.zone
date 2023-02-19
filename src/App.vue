<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view class="container is-fluid"/>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<style lang="scss">
</style>
