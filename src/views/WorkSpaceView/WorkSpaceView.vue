<template>
    <div class="partner-wrapper" v-if="this.role == 0">
        <SideBar :source="PartnerSideBarSource" />
        <ContentBar />
    </div>
    <div class="admin-wrapper" v-else-if="this.role == 1">
        <SideBar @linkAction="adminLinkAction" :source="AdminSideBarSource" />
        <ContentBar :partnersSource="partnersSource" :contentState="contentState" />
    </div>
    
</template>

<script lang="ts" src="./WorkSpaceView.ts" />

<style scoped>
    .partner-wrapper {
        width: 100%;
        height: 100%;
        padding: 0%;
        padding-left: 0;
        padding-right: 0;
        display: flex;
        justify-content: space-between;
    }

    .admin-wrapper {
        width: 100%;
        height: 100%;
        padding: 0%;
        padding-left: 0;
        padding-right: 0;
        display: flex;
        justify-content: space-between;
    }
</style>    