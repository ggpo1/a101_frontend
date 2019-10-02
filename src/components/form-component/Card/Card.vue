<template>
  <div class="card-wrapper">
      <div v-for="(item, i) in CardSource" v-bind:key="i">
        <p>{{ item.type }}</p>
      </div>
  </div>
</template>

<script lang="ts" src="./Card.ts" />

<style scoped>
    .card-wrapper {
        width: 25%; min-height: 200px;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
    }
</style>