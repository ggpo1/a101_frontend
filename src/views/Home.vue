<template>
  <div class="home">
    <h3 class="hello">A101</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

@Component( { components: { HelloWorld } } )
export default class Home extends Vue {}
</script>
<style scoped>
.hello {
  margin-top: 100px;
}
</style>
