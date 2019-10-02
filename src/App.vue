<template>
  <div id="app">
    <MenuBar />
    <div class="routerview-wrapper">
      <router-view/>
    </div>
    
  </div>
</template>

<script lang="ts" src="./App.ts" />

<style>
* { padding: 0; margin: 0; }
html, body, #fullheight {
  min-height: 100% !important;
  height: 100%;
  background: #e5e5e5;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  
}

.routerview-wrapper {
  width: 100%; height: 100%;
  display: flex;

  justify-content: center;
  flex-direction: row;
}

</style>
