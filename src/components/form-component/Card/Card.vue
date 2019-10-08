<template>
  <div class="card-wrapper">
      <div v-for="(item, i) in CardSource" v-bind:key="i">
        <LabelBox v-if="item.type === 2" :title="item.title" />
        <InputBox v-else-if="item.type === 0" :inputName="item.name" @updateValue="(i, n) => $emit('updateValue', i, n)" :title="item.title" :id="'login_input_' + i" :inputMethod="item.inputMethod" :placeHolder="item.placeHolder" />
        <ButtonBox v-else-if="item.type === 1" @buttonAction="$emit('buttonAction')" />
      </div>
  </div>
</template>

<script lang="ts" src="./Card.ts" />

<style scoped>
    .card-wrapper {
        width: 25%;  height: 100%;
        background: #ffffff;
        display: flex;
        flex-direction: column;
        border-radius: 10px;
        padding: 3%;  
        border: 1px solid #cfcfcf;
    }
</style>