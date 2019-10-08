<template>
  <div id="app">
    <div class="routerview-wrapper">
      <router-view class="router-view" />
    </div>
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style>

* { padding: 0; margin: 0; }

html, body {margin:0;padding:0;height:100%;background: #293133}
@import url('https://fonts.googleapis.com/css?family=Comfortaa&display=swap');
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  
}

.routerview-wrapper {
  width: 100%; height: 100%;
  display: flex;

  justify-content: center;
  flex-direction: row;
}
.router-view {
  height: 100%;
  width: 100%;
}

</style>
