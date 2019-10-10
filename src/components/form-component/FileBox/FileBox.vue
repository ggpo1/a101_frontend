<template>
  
    <input class="file-box" @input="$emit('updateValue', $event.target.files, name);" type="file" id="file" name="file" multiple />
  
</template>

<script lang="ts" src="./FileBox.ts" />

<style scoped>
.file-box {
    width: 100%;
    height: 25px;
    border-radius: 5px;
    margin-top: 10px;
    -moz-outline-radius: 5px;
    padding: 1%;
    outline: none;
    border: 1px solid #cfcfcf;
}

.file-box:focus {
    box-shadow: 0 0 1pt 0.5pt #cfcfcf;
}
</style>