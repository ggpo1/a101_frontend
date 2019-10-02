<template>
  <div class="about">
    <h1>A101</h1>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ components: {} })
export default class About extends Vue {}
</script>

<style scoped>
  .about {
    width: 100%; height: 100%;
    display: flex;
  }
</style>