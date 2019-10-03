<template>
  <button :class="['button-box',]" @click="$emit('buttonAction')">Войти</button>
</template>

<script lang="ts" src="./ButtonBox.ts" />

<style scoped>
.button-box {
    width: 102%;
    height: 30px;
    border-radius: 5px;
    background: #5cb95c;
    color: white;
    padding: 0;
    margin-top: 15px;
    border: none;
    padding: 5px;
    border: 1px solid transparent;
    outline: none;
}

.button-box:focus {
    box-shadow: 0 0 1pt 0.5pt #cfcfcf;
}

.green {
    background: #5cb95c;
    color: white;
}
</style>