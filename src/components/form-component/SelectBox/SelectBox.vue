<template>
  <select
    v-if="value !== undefined"
    @change="$emit('updateValue', $event.target.value, name)"
    :value="value"
    :class="'select-box ' + (error ? 'red' : '')"
  >
    <option v-for="(item, i) in selectOptions" :value="i" v-bind:key="i">{{ item.title }}</option>
  </select>
  <select v-else @change="$emit('updateValue', $event.target.value, name)" :class="'select-box ' + (error ? 'red' : '')">
    <option v-for="(item, i) in selectOptions" :value="i" v-bind:key="i">{{ item.title }}</option>
  </select>
</template>

<script lang="ts" src="./SelectBox.ts" />

<style scoped>
.select-box {
  width: 102%;
  border-radius: 5px;
  margin-top: 10px;
  -moz-outline-radius: 5px;
  padding: 1%;
  outline: none;
  border: 1px solid #cfcfcf;
}

.select-box:focus {
  box-shadow: 0 0 1pt 0.5pt #cfcfcf;
}

.red {
  border: 1px solid red;
}
</style>