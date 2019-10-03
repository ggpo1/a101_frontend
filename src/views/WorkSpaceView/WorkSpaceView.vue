<template>
    <div class="partner-wrapper" v-if="this.role == 0">
        Партнер
    </div>
    <div class="admin-wrapper" v-else-if="this.role == 1">
        Админ
    </div>
    
</template>

<script lang="ts" src="./WorkSpaceView.ts" />

<style scoped>
    .partner-wrapper {
        width: 100%;
        height: 100%;
        background: red;
    }
</style>    