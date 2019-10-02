<template>
  <div class="login-view-wrapper">
    <Card class="card" :CardSource="CardSource"/>
  </div>
</template>

<script lang="ts" src="./LoginView.ts" />

<style>
  .login-view-wrapper {
    width: 100%; height: 100%;
    display: flex;
    justify-content: center;
  }
  
  .card {
    margin-top: 100px;
  }

</style>