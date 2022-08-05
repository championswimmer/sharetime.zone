<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <span class="navbar-item has-text-primary has-text-weight-bold">\ sharetime.zone \</span>
      <a role="button"
         class="navbar-burger"
         :class="{'is-active': expanded}"
         @click="toggle()"
         aria-label="menu"
         aria-expanded="false"
         data-target="navMenu">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navMenu"
         class="navbar-menu"
         @click="toggle()"
         :class="{'is-active': expanded}">
      <div class="navbar-start">
        <router-link to="/" class="navbar-item">Home</router-link>
        <router-link to="/how" class="navbar-item">How</router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const expanded = ref(false)

function toggle () {
  expanded.value = !expanded.value
}

</script>

<style scoped lang="scss">

</style>
