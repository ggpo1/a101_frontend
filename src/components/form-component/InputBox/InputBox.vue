<template>
  <input :type="inputMethod" :value="value" @input="$emit('updateValue', $event.target.value, inputName)" class="input-box" name="" id="" :placeholder="placeHolder">
</template>

<script lang="ts" src="./InputBox.ts" />

<style scoped>
.input-box {
    width: 100%;
    height: 25px;
    border-radius: 5px;
    margin-top: 10px;
    -moz-outline-radius: 5px;
    padding: 1%;
    outline: none;
    border: 1px solid #cfcfcf;
}

.input-box:focus {
    box-shadow: 0 0 1pt 0.5pt #cfcfcf;
}
</style>