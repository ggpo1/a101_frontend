<template>
  <div id="nav">
    <router-link to="/Home">Главная</router-link>
    <router-link to="/Login">Войти</router-link>
  </div>
</template>

<script lang="ts" src="./MenuBar.ts" />

<style scoped>
#nav {
  padding: 10px;
  display: flex;
  justify-content: center;
}

#nav a {
  font-weight: bold;
  color: #25669b;
  margin-left: 10px;
}

</style>