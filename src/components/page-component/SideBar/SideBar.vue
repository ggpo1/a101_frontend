<template>
  <div class="sidebar-wrapper">
    <div class></div>
    <div class="sidebar-link" v-for="(item, i) in source" v-bind:key="i">
      <div @click="$emit('linkAction', item.name)" class="link" :to="item.href">{{ item.title }}</div>
    </div>
    <div class="account-block" @click="exitAction">Выход</div>
  </div>
</template>

<script lang="ts" src="./SideBar.ts" />

<style scoped>
.sidebar-wrapper {
  width: 20%;
  height: 85%;
  background: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid #cfcfcf;
  margin-top: 5%;
  display: flex;
  flex-direction: column;
  font-size: 1.5vw;
  position: relative;
}

.sidebar-link {
  padding: 8%;
  width: 100%;
  display: flex;
}

.link {
  color: #333333;
  text-decoration: none;
  cursor: pointer;
}

.account-block {
  width: 20%;
  border-radius: 15px;
  height: 4%;
  position: fixed;
  cursor: pointer;
  margin-top: 40%;
  text-align: center;
}
</style>