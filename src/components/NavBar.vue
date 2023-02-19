<template>
  <nav class="navbar" role="navigation">
    <div class="navbar-brand">
      <span class="navbar-item has-text-primary has-text-weight-bold">\ sharetime.zone \</span>
      <a
        role="button"
        class="navbar-burger"
        :class="{'is-active': expanded}"
        aria-label="menu"
        aria-expanded="false"
        data-target="navMenu"
        @click="toggle()"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div
      id="navMenu"
      class="navbar-menu"
      :class="{'is-active': expanded}"
      @click="toggle()"
    >
      <div class="navbar-start">
        <NuxtLink to="/" class="navbar-item">
          Home
        </NuxtLink>
        <NuxtLink to="/about" class="navbar-item">
          How
        </NuxtLink>
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
