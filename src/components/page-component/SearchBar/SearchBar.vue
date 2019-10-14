<template>
    <input class="search-bar" type="text" name="" id="" placeholder="Поиск">
</template>

<script lang="ts" src="./SearchBar.ts" />

<style>
    .search-wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .search-bar {
        width: 100%;
        height: 25px;
        border-radius: 5px;
        margin-top: 10px;
        -moz-outline-radius: 5px;
        outline: none;
        
        border: 1px solid #cfcfcf;
        text-align: center;
    }

    .search-bar:focus {
        width: 99%;
        padding-left: 1%;
        text-align: left;
    }
</style>