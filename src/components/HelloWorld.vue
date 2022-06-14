<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2> {{  name  }} </h2>

  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'

const name = ref('Hello World')
const props = defineProps({
  msg: String
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
