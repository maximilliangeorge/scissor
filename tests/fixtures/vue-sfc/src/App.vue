<template>
  <div>
    <Child />
    <AsyncChild />
  </div>
</template>

<script setup>

import Child from './Child.vue'
import { defineAsyncComponent } from 'vue'

const AsyncChild = defineAsyncComponent(() => import('./AsyncChild.vue'))

</script>

<style>

h1 {
  color: red;
}

</style>